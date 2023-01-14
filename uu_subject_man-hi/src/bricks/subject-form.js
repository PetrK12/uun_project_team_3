//@@viewOn:imports
import {Box, Card, CardContent, Stack, Grid, Typography, CardActions, Button, Modal, TextField} from "@mui/material";
import Form from "react-bootstrap/Form"
import { useState } from "react"
import Alert from "@mui/material/Alert";
import * as React from "react";
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import Config from "./config/config";
import AddIcon from "@mui/icons-material/Add";

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
    const [formData, setFormData] = useState({});

    const handleChange = (event) => {
      let tmpData = formData
      tmpData[event.target.id] = event.target.value
      setFormData(tmpData);
    };

    function createSubject() {
      // TODO create subject


      props.setFormShow(false)
    }
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Modal open={props.formShow} onClose={() => props.setFormShow(false)}>
        <Card sx={style}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={4}>
              <TextField id="name" label="Název" variant="outlined" onChange={handleChange}/>
              <TextField id="goal" label="Cíl" variant="outlined" onChange={handleChange}/>
              <TextField id="teacher" label="Učitel" variant="outlined" onChange={handleChange}/>
              <TextField id="credits" label="Počet kreditů" variant="outlined" onChange={handleChange}/>

              <TextField id="language" label="Jazyk" variant="outlined" onChange={handleChange}/>
              <TextField id="studyMaterials" label="Studijní materiály" variant="outlined" onChange={handleChange}/>
              <TextField id="topics" label="Topiky" variant="outlined" onChange={handleChange}/>
            </Stack>
          </CardContent>
          <CardActions >
            <Button size="small" onClick={() => createSubject()}><AddIcon /></Button>
          </CardActions>
        </Card>
      </Modal>
    );
      //@@viewOff:render
  },
});
//@@viewOn:exports

/*

    name: uu5String(512).isRequired(),
    goal: uu5String(512),
    teacher: uu5String(512),
    degree: uu5String(512),
    language: uu5String(512),
    credits: integer(),
    studyMaterialList: array(
      shape({
          id: id()
    })),
    topicList: array(
      shape({
          id: id()
    })),

 */

//@@viewOn:exports
export { SubjectForm };
export default SubjectForm;
//@@viewOff:exports
