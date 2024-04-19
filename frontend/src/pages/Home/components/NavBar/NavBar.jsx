import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Profile/Profile";
import Search from "./components/Search/Search";
import Users from "./components/User/Users";
import Grid from "@material-ui/core/Grid";
import { fetchDialogsData } from "../../../../redux/actions/dialogs";
import { fetchUserData } from "../../../../redux/actions/user";
import { Divider } from "@material-ui/core";
import socket from "../../../../core/socket";
import CreateDialog from "./components/CreateDialog/CreateDialog";

const NavBar = ({ id, firstName, lastName, avatar }) => {
  const dispatch = useDispatch();
  const { dialogsArray, selectedDialog, foundDialogs } = useSelector(
    ({ dialogs }) => dialogs
  );

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    dispatch(fetchUserData(userId));
    dispatch(fetchDialogsData());

    socket.on("SERVER:DIALOG_CREATED", (dialogObj) => {
      dispatch(fetchDialogsData());
    });
    socket.on("SERVER:DIALOG_UPDATE_TIME", (createdAt) => {
      dispatch(fetchDialogsData());
    });

    return () => {
      socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogsData());
      socket.removeListener("SERVER:DIALOG_UPDATE_TIME", fetchDialogsData());
    };
  }, [dispatch]);

  return (
    <div>
      <Profile
        id={id}
        firstName={firstName}
        lastName={lastName}
        avatar={avatar}
      />
      <Divider />
      <CreateDialog />
      <Divider />
      <Search />
      <Grid
        style={{
          height: "60vh",
          overflowY: "auto",
        }}
      >
        {foundDialogs ? (
          <Users
            dialogsArray={foundDialogs}
            selectedDialog={selectedDialog}
            thisAccountId={id}
          />
        ) : (
          <Users
            dialogsArray={dialogsArray}
            selectedDialog={selectedDialog}
            thisAccountId={id}
          />
        )}
      </Grid>
    </div>
  );
};

export default NavBar;
