import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Status from "../../../../../common/Status";

const User = ({id, firstName, lastName, photo, isOnline }) => {

  return (
    <ListItem button key={id}>
      <ListItemIcon>
        <Avatar
          alt={`${firstName} ${lastName}`}
          src={photo != null ? photo : "/static/images/avatar/1.jpg"}
        />
        {isOnline ? <Status /> : <div></div>}
      </ListItemIcon>
      <ListItemText>{`${firstName} ${lastName}`}</ListItemText>
    </ListItem>
  );
};

export default User;
