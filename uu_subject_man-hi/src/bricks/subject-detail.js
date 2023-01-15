//@@viewOn:imports
import {Utils, createVisualComponent, PropTypes, useScreenSize, useEffect, useState} from "uu5g05";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Grid,
  Typography,
  CardActions,
  Button,
  Modal,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress, Container, Link
} from "@mui/material";
import * as React from "react"

import Config from "./config/config.js";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CardMembershipOutlinedIcon from "@mui/icons-material/CardMembershipOutlined";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SubjectTile from "./subject-tile";

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

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectDetail = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectDetail",
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
    const [topics, setTopics] = useState([])

    useEffect(() => {
      if (props.subject.topicList === undefined) { return }

      fetch('http://localhost:8080/uu-subject-man/22222222222222222222222222222222/topic/list')
        .then(response => response.json())
        .then(data => {
          let tmpTopics = []
          props.subject.topicList.forEach(topic => {
            const found = data.data.itemList.find(x => x.id === topic.id)
            tmpTopics.push(found)
          })
          setTopics(tmpTopics)
          return(tmpTopics)
        })
        .then(topicsFound => {
          fetch('http://localhost:8080/uu-subject-man/22222222222222222222222222222222/studyMaterial/list')
            .then(response => response.json())
            .then(data => {
              let topicsAndMaterials = []

              topicsFound.forEach(topic => {
                if (topic.studyMaterialList === undefined) { return }

                let studyMaterialsFound = []
                topic.studyMaterialList.forEach(studyMaterial => {
                  const found = data.data.itemList.find(x => x.id === studyMaterial.id)
                  studyMaterialsFound.push(found)
                })

                topicsAndMaterials.push({
                  "topic": topic,
                  "studyMaterials": studyMaterialsFound
                })
              })
              setTopics(topicsAndMaterials)
            })
        })
    }, [])

    function showEdit() {
      if (props.showEdit) {
        return (
          <Button size="small" onClick={() => {}}>Upravit</Button>
        )
      } else {
        return (<></>)
      }
    }

    function getStudyMaterials(studyMaterials) {
      if (studyMaterials === undefined) { return (<></>) }

      let studyMaterialsHtml = []
      studyMaterials.forEach(material => {
        studyMaterialsHtml.push(
          (
            <Card>
              <CardContent>
                <Stack spacing={1}>
                  <Typography>
                    <b>{material.name}</b>
                  </Typography>
                  <Stack direction="row" spacing={4}>
                    <Typography>
                      <u>Obtížnost</u>: {material.difficulty}
                    </Typography>
                    <Typography>
                      <u>Délka</u>: {material.length}
                    </Typography>
                  </Stack>
                  <Link rel="noopener noreferrer" href={material.material} target="_blank">
                    {material.material}
                  </Link>
                </Stack>
              </CardContent>
            </Card>
          )
        )
      })

      return studyMaterialsHtml
    }

    function getTopic(topic) {
      if (topic.topic === undefined) { return (<CircularProgress />)}

      return (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{topic.topic.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={2}>
              <Typography>
                <b>Celková obtížnost:</b> {topic.topic.difficulty}
              </Typography>
              {getStudyMaterials(topic.studyMaterials)}
            </Stack>

          </AccordionDetails>
        </Accordion>
      )
    }

    function topicListComponent() {
      let child;
      if (typeof topics === 'undefined' || topics.length === 0) {
        child = (<></>)
      } else {
        const topicHtmlList = [];
        topics.forEach(topic => {
          topicHtmlList.push(getTopic(topic))
        })
        child = (<>
            <Typography variant="h5">
              Témata
            </Typography>
            {topicHtmlList}
          </>
        );
      }
      return child;
    }

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Modal open={props.detailShow} onClose={() => props.setDetailShow(false)}>
        <Card sx={style}>
          <CardContent>
            <Stack spacing={2}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                {props.subject.name}
              </Typography>

              <Stack direction="row" spacing={3}>
                <Stack direction="row" spacing={1}>
                  <WorkspacePremiumOutlinedIcon color="primary" />
                  <Typography>{props.subject.degree}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <LanguageOutlinedIcon color="primary"/>
                  <Typography>{props.subject.language}</Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <CardMembershipOutlinedIcon color="primary"/>
                  <Typography>{props.subject.credits}</Typography>
                </Stack>
              </Stack>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {props.subject.goal}
              </Typography>

              <div>
                {topicListComponent()}
              </div>

            </Stack>

          </CardContent>
          <CardActions >
            {showEdit()}
          </CardActions>
        </Card>
      </Modal>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectDetail };
export default SubjectDetail;
//@@viewOff:exports

/*


 <Modal.Header closeButton>
            <Modal.Title>Video Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Typography variant="h5" component="div">
              {props.subject.name}<br />
            </Typography>
          </Modal.Body>
          <Modal.Footer>
            <Grid container>
              <Grid item>
                <Stack spacing={2} direction="row">
                  <Button variant="outlined" onClick={() => props.setDetailShow(false)}>
                    Close
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Modal.Footer>

 */
