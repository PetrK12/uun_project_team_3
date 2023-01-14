//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import {Container, Stack, Box, Tabs, Tab, Grid, Typography, CircularProgress, Fab} from "@mui/material";
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import CardMembershipOutlinedIcon from '@mui/icons-material/CardMembershipOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';

import SubjectTile from "../bricks/subject-tile";
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

const StudyProgramTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StudyProgramTile",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    //const attrs = Utils.VisualComponent.getAttrs(props);
    return (
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
              <Typography>{props.studyProgram.numberOfCredits} kreditů</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { StudyProgramTile };
export default StudyProgramTile;
//@@viewOff:exports

/*
show={!!props.detailShow} onHide={() => props.setDetailShow(false)}
 */
