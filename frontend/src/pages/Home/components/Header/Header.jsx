import React from "react";
import {
  Grid,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";

const Header = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" style={{ paddingTop: "8px" }}>
          <ListItem>
            <ListItemIcon>
              <ChatIcon
                fontSize="large"
                color="primary"
                style={{ paddingRight: "5px" }}
              ></ChatIcon>
              <span style={{ color:"white"}}>Chat App</span>
            </ListItemIcon>
          </ListItem>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
