import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import UserLoading from "../../../../common/UserLoading";

const Profile = React.memo(({ _id, firstName, lastName }) => {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div>
      {_id ? (
        <List>
          <ListItem button key={_id}>
            <ListItemIcon>
              <Avatar
                alt={fullName}
                src="https://material-ui.com/static/images/avatar/1.jpg"
              />
            </ListItemIcon>
            <ListItemText primary={fullName}></ListItemText>
          </ListItem>
        </List>
      ) : (
        <UserLoading />
      )}
    </div>
  );
});

export default Profile;
