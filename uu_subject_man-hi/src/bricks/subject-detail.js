//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import {Box, Card, CardContent, Stack, Grid, Typography, CardActions, Button, Modal} from "@mui/material";
import * as React from "react"

import Config from "./config/config.js";

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
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Modal open={props.detailShow} onClose={() => props.setDetailShow(false)}>
        <Card sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.subject.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.subject.goal}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.subject.teacher}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.subject.degree}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.subject.credits}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.subject.studyMaterialList}
          </Typography>
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
