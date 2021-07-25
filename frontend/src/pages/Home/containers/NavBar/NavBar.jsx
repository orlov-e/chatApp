import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Profile from "./components/Profile";
import Search from "./components/Search";
import Users from "./components/Users";
import Grid from "@material-ui/core/Grid";
import { fetchDialogsData } from "../../../../redux/actions/dialogs";
import { fetchUserData } from "../../../../redux/actions/user";
import { Divider } from "@material-ui/core";
import socket from "../../../../core/socket";

const NavBar = ({ _id, firstName, lastName }) => {
  const dispatch = useDispatch();
  const { dialogsArray, selectedDialog } = useSelector(({ dialogs }) => dialogs);

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchDialogsData());

    socket.on("SERVER:DIALOG_CREATED", (dialogObj) => {
      dispatch(fetchDialogsData());

      return () => {
        socket.removeListener("SERVER:DIALOG_CREATED", fetchDialogsData());
      };
    });
  }, []);

  return (
    <div>
      <Profile _id={_id} firstName={firstName} lastName={lastName} />
      <Divider />
      <Search />
      <Grid
        style={{
          height: "65vh",
          overflowY: "auto",
        }}
      >
        <Users
          dialogsArray={dialogsArray}
          selectedDialog={selectedDialog}
          thisAccountId={_id}
        />
      </Grid>
    </div>
  );
};

export default NavBar;
