import React from "react";
import { Grid, makeStyles, Typography } from "@material-ui/core";
import SpeakerNotesOffIcon from "@material-ui/icons/SpeakerNotesOff";

const NoMessages = () => {
  const classes = useStyles();

  return (
    <Grid
      className={classes.noMessagesBlock}
      container
      direction="column"
      justifyContent="flex-end"
      alignItems="center"
    >
      <SpeakerNotesOffIcon
        color="primary"
        className={classes.SpeakerNotesOffIcon}
      />
      <Typography className={classes.text}>There are no messages here.</Typography>
    </Grid>
  );
};

export default NoMessages;

const useStyles = makeStyles({
  noMessagesBlock: { paddingTop: "40%" },
  SpeakerNotesOffIcon: {
    width: 45,
    height: 45,
    paddingBottom: "3px"
  },
  text: {
    fontSize: "22px"
  }
});
