import React from "react";
import List from "@material-ui/core/List";
import User from "./User/User";
import UserLoading from "../../../../../common/UserLoading";
import { getDialogTime } from "../../../../../utils/formatTime";
import { Grid, Typography } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

const Users = ({ dialogsArray, selectedDialog, thisAccountId }) => {
  return (
    <div>
      {dialogsArray !== null ? (
        <div>
          {dialogsArray.length > 0 ? (
            <List>
              {dialogsArray.map((dialog) => {
                if (dialog.partner._id === thisAccountId) {
                  return (
                    <User
                      dialogId={dialog._id}
                      userId={dialog.initiator._id}
                      fullName={dialog.initiator.fullName}
                      selectedDialog={selectedDialog}
                      time={getDialogTime(dialog.updatedAt)}
                      photo={dialog.initiator.avatar || null}
                      isOnline={dialog.initiator.isOnline}
                    />
                  );
                } else {
                  return (
                    <User
                      dialogId={dialog._id}
                      userId={dialog.partner._id}
                      fullName={dialog.partner.fullName}
                      time={getDialogTime(dialog.updatedAt)}
                      selectedDialog={selectedDialog}
                      photo={dialog.partner.avatar || null}
                      isOnline={dialog.partner.isOnline}
                    />
                  );
                }
              })}
            </List>
          ) : (
            <Grid
              container
              style={{ paddingTop: "20px" }}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item>
                <ErrorOutlineIcon color="primary" fontSize="large" />
              </Grid>
              <Grid item>
                <Typography h6>Nothing found</Typography>
              </Grid>
            </Grid>
          )}
        </div>
      ) : (
        <div>
          <UserLoading />
          <UserLoading />
          <UserLoading />
          <UserLoading />
          <UserLoading />
          <UserLoading />
        </div>
      )}
    </div>
  );
};

export default Users;
