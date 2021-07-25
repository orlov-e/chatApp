import React, { useState } from "react";
import List from "@material-ui/core/List";
import User from "./User/User";
import UserLoading from "../../../../../common/UserLoading";

const Users = ({ dialogsArray, selectedDialog, thisAccountId }) => {
  return (
    <div>
      {dialogsArray ? (
        <List>
          {dialogsArray.map((dialog) => {
            if (dialog.partner._id === thisAccountId) {
              return (
                <User
                  dialogId={dialog._id}
                  userId={dialog.initiator._id}
                  firstName={dialog.initiator.firstName}
                  lastName={dialog.initiator.lastName}
                  selectedDialog={selectedDialog}
                  photo={null}
                  isOnline={false}
                />
              );
            } else {
              return (
                <User
                  dialogId={dialog._id}
                  userId={dialog.partner._id}
                  firstName={dialog.partner.firstName}
                  lastName={dialog.partner.lastName}
                  selectedDialog={selectedDialog}
                  photo={null}
                  isOnline={false}
                />
              );
            }
          })}
        </List>
      ) : (
        <div>
          <UserLoading />
          <UserLoading />
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
