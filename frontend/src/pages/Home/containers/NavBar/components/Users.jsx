import React from "react";
import List from "@material-ui/core/List";
import User from "./User/User";
import UserLoading from "../../../../../common/UserLoading";
import { getDialogTime } from "../../../../../utils/formatTime";

const Users = ({ dialogsArray, selectedDialog, thisAccountId, foundUsers }) => {
  return (
    <div>
      {dialogsArray.length > 0 ? (
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
                  time={getDialogTime(dialog.updatedAt)}
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
                  time={getDialogTime(dialog.updatedAt)}
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
        </div>
      )}
    </div>
  );
};

export default Users;
