import React from "react";
import List from "@material-ui/core/List";
import User from "./User/User";
import UserLoading from "../../../../common/UserLoading";

const Users = ({ dialogsArray }) => {
  return (
    <div>
      {dialogsArray ? (
        <List>
          {dialogsArray.map(({ partner }) => {
            return (
              <User
                id={partner._id}
                firstName={partner.firstName}
                lastName={partner.lastName}
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
