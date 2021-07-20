import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Status from "../../../../common/Status";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlassCard } from "../../../../common/GlassCard";

const Message = ({ isMe = false, messageText, date, id }) => {

  return (
    <div>
      {isMe ? (
        <ListItem key="1" style={{ justifyContent: "flex-end" }}>
          <GlassCard color="deepskyblue">
            <ListItemText
              style={{ padding: "8px" }}
              primary="Hey man, What's up ?"
              secondary="10:30"
            ></ListItemText>
          </GlassCard>
          <ListItemIcon style={{ justifyContent: "flex-end" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
        </ListItem>
      ) : (
        <ListItem key="1" alignItems="flex-start">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Status />
          </ListItemIcon>
          <GlassCard>
            <ListItemText
              style={{ padding: "8px" }}
              primary="Hey man, What's up ?"
              secondary="10:30"
            ></ListItemText>
          </GlassCard>
        </ListItem>
      )}
    </div>
  );
};

export default Message;
