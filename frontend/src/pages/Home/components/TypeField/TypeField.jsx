import React from "react";
import { Grid, TextField, Fab } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";

const TypeField = () => {
  return (
    <Grid container style={{ padding: "20px" }}>
      <Grid item xs={11}>
        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
      </Grid>
      <Grid xs={1} align="right">
        <Fab color="primary" aria-label="add">
          <SendIcon />
        </Fab>
      </Grid>
    </Grid>
  );
};

export default TypeField;
