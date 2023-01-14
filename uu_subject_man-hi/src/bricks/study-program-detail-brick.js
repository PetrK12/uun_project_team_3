//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import {Container, Stack, Box, Tabs, Tab, Grid, Typography, CircularProgress, Fab} from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import SubjectTile from "../bricks/subject-tile";
import StudyProgramTile from "../bricks/study-program-tile";
import SubjectForm from "../bricks/subject-form";
import Config from "./config/config.js";
import { useState, useEffect } from "react";
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
    const [subjects, setSubjects] = useState({})
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    useEffect(() => {
      // TODO use BE to load subjects

      setSubjects(props.subjects)
    }, [])

    function handleDelete(subjectId) {
      // TODO use BE to delete subject
      let tmpSubjects

      for (const studyProgram in subjects) {
        for (const subject in studyProgram) {
          if (subject.id != subjectId) {
            tmpSubjects[studyProgram] += subject
          }
        }
      }
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
        subjectHtmlList.push(<SubjectTile subject={subject} handleDelete={handleDelete}/>)
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    //const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
        <SubjectForm formShow={formShow} setFormShow={setFormShow}/>
        <StudyProgramTile studyProgram={props.studyProgram}/>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Povinné" {...a11yProps(0)} />
            <Tab label="Povinně volitelné" {...a11yProps(1)} />
            <Tab label="Volitelné" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {subjectListComponent(subjects.mandatory)}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {subjectListComponent(subjects.compulsoryOptional)}
        </TabPanel>
        <TabPanel value={value} index={2}>
          {subjectListComponent(subjects.optional)}
        </TabPanel>

        <Fab color="primary" aria-label="add"
             sx={{ position: 'absolute', bottom: 50, right: 50 }}
             onClick={() => setFormShow(true)}
        >
          <AddIcon />
        </Fab>
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
