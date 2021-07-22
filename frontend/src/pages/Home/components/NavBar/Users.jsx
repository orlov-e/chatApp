import React from "react";
import List from "@material-ui/core/List";
import User from "./User/User";
import UserLoading from "../../../../common/UserLoading";

const Users = ({ dialogsArray, currentDialog }) => {

  return (
    <div >
      {dialogsArray ? (
        <List>
          {dialogsArray.map((dialog) => {
            return (
              <User
                dialogId={dialog._id}
                id={dialog.partner._id}
                firstName={dialog.partner.firstName}
                lastName={dialog.partner.lastName}
                photo={null}
                isOnline={false}
              />
            );
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
