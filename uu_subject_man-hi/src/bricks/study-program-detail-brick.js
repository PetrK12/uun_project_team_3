//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize, useEffect, useSession } from "uu5g05";
import {Container, Stack, Box, Tabs, Tab, Grid, Typography, CircularProgress, Fab} from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import SubjectTile from "../bricks/subject-tile";
import StudyProgramTile from "../bricks/study-program-tile";
import SubjectForm from "../bricks/subject-form";
import Config from "./config/config.js";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import SubjectDetail from "./subject-detail";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const StudyProgramDetailBrick = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StudyProgramDetail",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    left: PropTypes.node,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    left: undefined,
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [formShow, setFormShow] = useState(false);
    const [value, setValue] = useState(0);
    const [isTeacher, setIsTeacher] = useState(false)
    const { identity } = useSession();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      fetch('http://localhost:8080/uu-subject-man/22222222222222222222222222222222/sys/uuAppWorkspace/permission/list?uuIdentityList=' + identity.uuIdentity)//?uuIdentityList=4624-469-1')
        .then(response => response.json())
        .then(data => {
          if (data.itemList[0].profile === "Executives") {
            //setIsTeacher(true)
            setIsTeacher(true)
          } else {
            setIsTeacher(false)
          }
        })
    }, [])

    const handleDelete = (id) => {
      //let tmpProgram = {id: props.studyProgram.id, subjectList: props.studyProgram.subjectList}
      //let tmpProgram = Object.assign({}, props.studyProgram)
      let tmpProgram = JSON.parse(JSON.stringify(props.studyProgram))

      let subjectIndex = tmpProgram.subjectList.findIndex(subject => subject.id === id)
      if (subjectIndex < 0) {
        console.log("Subject neexistuje")
        throw new Error("Subject neexistuje")
      }
      tmpProgram.subjectList.splice(subjectIndex, 1)

      let tmpSubjects = JSON.parse(JSON.stringify(props.subjects))

      for (const subject in props.subjects) {
        let subjectIndex2 = props.subjects[subject].findIndex(x => x.id === id)
        if (subjectIndex2 >= 0) {
          tmpSubjects[subject].splice(subjectIndex2, 1)
          break
        }
      }

      props.setSubjectList(tmpSubjects)
      fetch("http://localhost:8080/uu-subject-man/22222222222222222222222222222222/studyprogram/update", {
        method: "POST",
        body: JSON.stringify({"id": tmpProgram.id, "subjectList": tmpProgram.subjectList}),
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          if (response.status >= 400) {
            throw new Error(response.json())
          }
          return response.json()
        })
    }

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    function getSubjectHtmlList(subjectList) {
      const subjectHtmlList = [];
      subjectList.forEach(subject => {
        subjectHtmlList.push(<SubjectTile subject={subject} handleDelete={handleDelete} showDelete={isTeacher}/>)
      })
      return subjectHtmlList;
    }

    function getChild(subjectList) {
      let child;
      if (!subjectList) {
        child = (<CircularProgress />)
      } else {
        child = getSubjectHtmlList(subjectList);
      }
      return child;
    }

    function subjectListComponent(subjectList) {
      return (
        <Stack>
          <Container sx={{ py: 1 }} maxWidth="md">
            <Grid container spacing={4}>
              {getChild(subjectList)}
            </Grid>
          </Container>
        </Stack>
      )
    }

    function TabPanel(props) {
      const { children, value, index, ...other } = props;

      return (
        <div
          role="tabpanel"
          hidden={value !== index}
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          {...other}
        >
          {value === index && (
            <Box sx={{ p: 3 }}>
              <Typography>{children}</Typography>
            </Box>
          )}
        </div>
      );
    }

    function addButton() {
      if (isTeacher) {
        return (
          <Fab color="primary" aria-label="add" disabled={!isTeacher}
               sx={{ position: 'absolute', bottom: 50, right: 50 }}
               onClick={() => setFormShow(true)}
          >
            <AddIcon />
          </Fab>
        )
      } else {
        return <></>
      }
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    //const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
        <SubjectForm formShow={formShow} setFormShow={setFormShow} subjects={props.subjects} setSubjectList={props.setSubjectList} currentTab={value} studyProgram={props.studyProgram} setStudyProgram={props.setStudyProgram}/>
        <StudyProgramTile studyProgram={props.studyProgram}/>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Povinné" {...a11yProps(0)} />
            <Tab label="Povinně volitelné" {...a11yProps(1)} />
            <Tab label="Volitelné" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {subjectListComponent(props.subjects.mandatory)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {subjectListComponent(props.subjects.compulsoryOptional)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {subjectListComponent(props.subjects.optional)}
        </TabPanel>

        {addButton()}
      {/*</div>*/}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { StudyProgramDetailBrick };
export default StudyProgramDetailBrick;
//@@viewOff:exports

/*
show={!!props.detailShow} onHide={() => props.setDetailShow(false)}
 */
