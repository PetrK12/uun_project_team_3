//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";

import {Card, CardContent, Stack, Grid, Typography, CardActions, Button, Modal} from "@mui/material";
import Config from "./config/config.js";

//@@viewOff:imports

//@@viewOn:constants
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
      <Modal show={!!props.detailShow} onHide={() => props.setDetailShow(false)}>
        <div>
          test
        </div>
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
