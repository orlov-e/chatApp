import React from 'react';
import List from '@material-ui/core/List';
import User from './User';
import UserLoading from '../../../../../../common/UserLoading';
import { getDialogTime } from '../../../../../../utils/formatTime';
import { Grid } from '@material-ui/core';

const Users = React.memo(({ dialogsArray, selectedDialog, thisAccountId }) => {
  if (!dialogsArray) {
    return (
      <div>
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
        <UserLoading />
      </div>
    );
  }

  if (dialogsArray.length === 0) {
    return (
      <Grid container style={{ paddingTop: '20px' }} direction="column" alignItems="center" justify="center"></Grid>
    );
  }

  return (
    <List>
      {dialogsArray.map((dialog) => {
        const user = dialog.partner.id === thisAccountId? dialog.initiator : dialog.partner;
        return (
          <User
            dialogId={dialog.id}
            userId={user.id}
            fullName={`${user.firstName} ${user.lastName}`}
            time={getDialogTime(dialog?.lastMessage?.createdAt)}
            selectedDialog={selectedDialog}
            avatar={user.avatar || null}
            isOnline={user.isOnline}
          />
        );
      })}
    </List>
  );
});

export default Users;