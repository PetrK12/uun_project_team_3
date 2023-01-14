//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import {Container, Stack, Box, Tabs, Tab, Grid, Typography, CircularProgress, Fab} from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import SubjectTile from "../bricks/subject-tile";
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
    const [detailShow, setDetailShow] = useState(false);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    function a11yProps(index) {
      return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
      };
    }

    function getSubjectHtmlList(subjectList) {
      const subjectHtmlList = [];

      subjectList.forEach(subject => {
        subjectHtmlList.push(<SubjectTile subject={subject} setDetailShow={setDetailShow}/>)
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
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <div {...attrs}>
        <Box padding={3} ml={20} >
          <Stack spacing={4}>
            <Typography variant="h2" color="primary">{props.studyProgram.name}</Typography>
            <Stack direction="row" spacing={6}>
              <Stack direction="row" spacing={1}>
                <WorkspacePremiumOutlinedIcon color="primary" />
                <Typography>{props.studyProgram.degree}ský stupeň studia</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <LanguageOutlinedIcon color="primary"/>
                <Typography>{props.studyProgram.language} jazyk</Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <CardMembershipOutlinedIcon color="primary"/>
                <Typography>{props.studyProgram.numberOfCredits}</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Box>

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

        <Fab color="primary" aria-label="add"
             sx={{ position: 'absolute', bottom: 50, right: 50 }}
             onClick={() => setFormShow(true)}
        >
          <AddIcon />
        </Fab>
      </div>
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
