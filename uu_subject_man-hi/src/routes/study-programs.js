//@@viewOn:imports
import {Utils, createVisualComponent, useEffect, useState} from "uu5g05";
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
    // TODO connect to backend
    useEffect(() => {
      setStudyPrograms(studyProgramsDef)

      /*
      fetch('/video/list')
        .then(response => response.json())
        .then(data => setVideoList(data))

      fetch("topic/list")
        .then(response => response.json())
        .then(data => {
          let names = []
          data.forEach(topic => {
            names.push(topic.name)
          })
          setTopicListNames(names)
          setTopicList(data)
        })
       */
    }, [])

    //const navigate = useNavigate();

    const handleClick = () => {
      // TODO
    }

    function getStudyProgramHtmlList() {
      const studyProgramHtmlList = [];
      studyPrograms.forEach(studyProgram => {
        studyProgramHtmlList.push(
          <Card>
            <CardActionArea onClick={handleClick}>
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
