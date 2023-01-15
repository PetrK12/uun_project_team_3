//@@viewOn:imports
import {Utils, createVisualComponent, useEffect, useState, useRoute} from "uu5g05";
import { withRoute } from "uu_plus4u5g02-app";

import Config from "./config/config.js";
import RouteBar from "../core/route-bar.js";
import StudyProgramTile from "../bricks/study-program-tile";
import StudyProgramDetailBrick from "../bricks/study-program-detail-brick";
import SubjectTile from "../bricks/subject-tile";
import {CircularProgress, Button, Grid, Stack, Card, Box, CardContent, CardActionArea} from "@mui/material";
import { useNavigate } from 'react-router-dom';

//@@viewOff:imports

//@@viewOn:constants

const studyProgramsDef = [
  {
    studyProgramId: "1",
    name: "Softwarový vývoj",
    degree: "Bakalář",
    language: "Český",
    numberOfCredits: 260,
    subjectList: ["147258", "741963"]
  },
  {
    studyProgramId: "1",
    name: "Business Management",
    degree: "Bakalář",
    language: "Český",
    numberOfCredits: 250,
    subjectList: ["147258", "741963"]
  }
]
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

let StudyPrograms = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StudyProgram",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [studyPrograms, setStudyPrograms] = useState()

    useEffect(() => {
      fetch('http://localhost:8080/uu-subject-man/22222222222222222222222222222222/studyprogram/list')
        .then(response => response.json())
        .then(data => setStudyPrograms(data.itemList))
    }, [])

    const [, setRoute] = useRoute();

    function getStudyProgramRouteName(name) {
      switch(name) {
        case "Business Management":
          return "businessManagement"
        case "Softwarový vývoj":
          return "softwareDevelopment"
        default:
          return "studyPrograms"
      }
    }

    function getStudyProgramHtmlList() {
      const studyProgramHtmlList = [];
      studyPrograms.forEach(studyProgram => {
        studyProgramHtmlList.push(
          <Card>
            <CardActionArea onClick = {() => setRoute(getStudyProgramRouteName(studyProgram.name))}>
              <CardContent>
                <StudyProgramTile studyProgram={studyProgram}/>
              </CardContent>
            </CardActionArea>
          </Card>
        )
      })
      return studyProgramHtmlList;
    }

    function getChild() {
      let child;
      if (!studyPrograms) {
        child = (<CircularProgress />)
      } else {
        child = getStudyProgramHtmlList();
      }
      return child;
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const attrs = Utils.VisualComponent.getAttrs(props);
    return (
      <>
        <RouteBar />
        <Stack spacing={10} >
          {getChild()}
        </Stack>
      </>
    );
    //@@viewOff:render
  },
});

StudyPrograms = withRoute(StudyPrograms, { authenticated: true });

//@@viewOn:exports
export { StudyPrograms };
export default StudyPrograms;
//@@viewOff:exports
