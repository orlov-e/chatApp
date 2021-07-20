import React from "react";
import List from "@material-ui/core/List";
import Message from "./Message";

const MessageArea = ({ dialogsArray }) => {

  return (
    <List>
      <Message />
      <Message isMe={true}/>
      </List>
  /* <ListItem key="2">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText
              align="left"
              primary="Hey, Iam Good! What about you ?"
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="left" secondary="09:31"></ListItemText>
          </Grid>
        </Grid>
      </ListItem>
      <ListItem key="3">
        <Grid container>
          <Grid item xs={12}>
            <ListItemText
              align="right"
              primary="Cool. i am good, let's catch up!"
            ></ListItemText>
          </Grid>
          <Grid item xs={12}>
            <ListItemText align="right" secondary="10:30"></ListItemText>
          </Grid>
        </Grid>
      </ListItem>*/
  );
};

export default MessageArea;

