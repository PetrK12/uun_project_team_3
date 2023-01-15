//@@viewOn:imports
import {
  Alert,
  Box,
  Card,
  CardContent,
  Stack,
  Grid,
  Typography,
  CardActions,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl, OutlinedInput, Chip, useTheme
} from "@mui/material";
import Form from "react-bootstrap/Form"
import * as React from "react";
import { Utils, createVisualComponent, PropTypes, useScreenSize, useState, useEffect, useCallback } from "uu5g05";
import Config from "./config/config";
import AddIcon from "@mui/icons-material/Add";
import studyPrograms from "../routes/study-programs";

//@@viewOff:imports

//@@viewOn:constants
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
//@@viewOff:constants

const SubjectForm = createVisualComponent({

  uu5Tag: Config.TAG + "SubjecForm",
  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },

  render(props) {
    //@@viewOn:private
    if (!props.studyProgram) {
      return null
    }

    const theme = useTheme();

    const [formData, setFormData] = useState({});
    const [language, setLanguage] = useState('')
    const [degree, setDegree] = useState('')
    const [error, setError] = useState(false)
    const [selectedStudyMaterials, setSelectedStudyMaterials] = useState([])
    const [studyMaterials, setStudyMaterials] = useState([])

    useEffect(() => {
      // TODO use BE to load subjects
      console.log(props.studyProgram)
      setStudyMaterials(["test", "ahoj"])
    }, [])

    const handleChange = (event) => {
      let tmpData = formData
      tmpData[event.target.id] = event.target.value
      setFormData(tmpData);
    };

    const handleLanguageChange = (event) => {
      setLanguage(event.target.value)
      let tmpData = formData
      tmpData["language"] = event.target.value
      setFormData(tmpData);
    };

    const handleDegreeChange = (event) => {
      setDegree(event.target.value)
      let tmpData = formData
      tmpData["degree"] = event.target.value
      setFormData(tmpData);
    };

    const handleStudyMaterialChange = (event) => {
      setSelectedStudyMaterials(event.target.value)
    };

    //function createSubject() {
    //const createSubject = useCallback( () => {
      const createSubject = () => {
        fetch("http://localhost:8080/uu-subject-man/22222222222222222222222222222222/subject/create", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status >= 400) {
            setError(true)
            throw new Error(response.json())
          }
          return response.json()
        })
        .then(data => {
          let newSubject = {"id": data.id, ...formData}

          let type
          let tmpSubjects = JSON.parse(JSON.stringify(props.subjects))

          if (props.currentTab === 0) {
            type = "mandatory"
            tmpSubjects.mandatory.push(newSubject)
          } else if (props.currentTab === 1) {
            type = "compulsory"
            tmpSubjects.compulsoryOptional.push(newSubject)
          } else if (props.currentTab === 2) {
            type = "optional"
            tmpSubjects.optional.push(newSubject)
          }

          props.setSubjectList(tmpSubjects)

          return {"type": type, id: data.id}
        })
        .then(newSubject => {
          let updatedStudyProgram = JSON.parse(JSON.stringify(props.studyProgram))
          updatedStudyProgram.subjectList.push(newSubject)
          props.setStudyProgram(updatedStudyProgram)
          fetch("http://localhost:8080/uu-subject-man/22222222222222222222222222222222/studyprogram/update", {
            method: "POST",
            body: JSON.stringify({"id": updatedStudyProgram.id, "subjectList": updatedStudyProgram.subjectList}),
            headers: {
              "Content-type": "application/json"
            }
          })
            .then(response => {
              if (response.status >= 400) {
                console.log(response.json())
                throw new Error(response.json())
              }
              props.setFormShow(false)
              return response.json()
            })
        })
    }

    function getStyles(name, personName, theme) {
      return {
        fontWeight:
          personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
      };
    }

    function showAlert() {
        if (error) {
          return (<Alert show={error} severity="error">Nepodařilo se předmět vytvořit. Pole název musí být vyplněno!</Alert>)
        }

        return (<></>)
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    // TODO topics

    //@@viewOn:render
    return (
      <Modal open={props.formShow} onClose={() => {
        setError(false)
        props.setFormShow(false)
      }}>
        <Card sx={style}>
          {showAlert()}
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={4}>
              <TextField id="name" label="Název" variant="outlined" onChange={handleChange}/>
              <TextField id="goal" label="Cíl" variant="outlined" onChange={handleChange}/>
              <TextField id="teacher" label="Učitel" variant="outlined" onChange={handleChange}/>
              <TextField id="credits" label="Počet kreditů" variant="outlined" onChange={handleChange}/>

              <FormControl fullWidth>
                <InputLabel id="language">Jazyk</InputLabel>
                <Select
                  labelId="language"
                  id="language"
                  value={language}
                  label="Jazyk"
                  onChange={handleLanguageChange}
                >
                  <MenuItem value={"Český"}>Český</MenuItem>
                  <MenuItem value={"Anglický"}>Anglický</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="degree">Stupeň studia</InputLabel>
                <Select
                  labelId="degree"
                  id="degree"
                  value={degree}
                  label="Stupeň studia"
                  onChange={handleDegreeChange}
                >
                  <MenuItem value={"Bakalářský"}>Bakalářský</MenuItem>
                  <MenuItem value={"Magisterský"}>Magisterský</MenuItem>
                </Select>
              </FormControl>

              <TextField id="topics" label="Témata" variant="outlined" onChange={handleChange}/>
            </Stack>
          </CardContent>
          <CardActions >
            <Button size="small" onClick={createSubject}>Přidat</Button>
          </CardActions>
        </Card>
      </Modal>
    );
      //@@viewOff:render
  },
});
//@@viewOn:exports

//@@viewOn:exports
export { SubjectForm };
export default SubjectForm;
//@@viewOff:exports
