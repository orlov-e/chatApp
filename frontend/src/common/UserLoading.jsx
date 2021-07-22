import React from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const UserLoading = () => {
  return (
          <ListItem button>
            <ListItemIcon>
              <Skeleton variant="circle" width={40} height={40}/>
            </ListItemIcon>
            <Skeleton variant="text" width="60%"/>
          </ListItem>
  );
};

export default UserLoading;
