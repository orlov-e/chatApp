import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Status from "../../../../../common/Status";
import { GlassCard } from "../../../../../common/GlassCard";

const Message = ({ isMe, text, date, messageId }) => {
  return (
    <div>
      {isMe ? (
        <ListItem key={messageId} style={{ justifyContent: "flex-end" }}>
          <GlassCard color="deepskyblue">
            <ListItemText
              style={{ padding: "8px" }}
              primary={text}
              secondary={date}
            ></ListItemText>
          </GlassCard>
          <ListItemIcon style={{ justifyContent: "flex-end" }}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemIcon>
        </ListItem>
      ) : (
        <ListItem key={messageId} alignItems="flex-start">
          <ListItemIcon>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            <Status />
          </ListItemIcon>
          <GlassCard>
            <ListItemText
              style={{ padding: "8px" }}
              primary={text}
              secondary={date}
            ></ListItemText>
          </GlassCard>
        </ListItem>
      )}
    </div>
  );
};

export default Message;
