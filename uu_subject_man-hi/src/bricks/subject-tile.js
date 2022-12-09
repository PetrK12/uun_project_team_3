//@@viewOn:imports
import { Utils, createVisualComponent, PropTypes, useScreenSize } from "uu5g05";
import {Card, CardContent, Stack, Grid, Typography, CardActions, Button} from "@mui/material";
import { useState } from "react";

import Config from "./config/config.js";
import SubjectDetail from "./subject-detail";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:css
//@@viewOff:css

//@@viewOn:helpers
//@@viewOff:helpers

const SubjectTile = createVisualComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SubjectTile",
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

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <Grid item key={props.subject.id} xs={12} sm={6} md={4}>
        <SubjectDetail subject={props.subject} detailShow={detailShow} setDetailShow={setDetailShow}/>

        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Stack spacing={1}>
              <Typography variant="h6" component="div">
                {props.subject.name}<br />
              </Typography>
              <Typography variant="body2" component="div">
                {props.subject.credits} kreditů<br />
              </Typography>
              <Typography variant="body2">
                {props.subject.goal}<br />
              </Typography>
            </Stack>
          </CardContent>
          <CardActions >
            <Button size="small" onClick={() => setDetailShow(true)}>Více informací</Button>
          </CardActions>
        </Card>
      </Grid>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SubjectTile };
export default SubjectTile;
//@@viewOff:exports

