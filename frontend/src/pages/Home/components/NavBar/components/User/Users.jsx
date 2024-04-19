import React from 'react';
import List from '@material-ui/core/List';
import User from './User';
import UserLoading from '../../../../../../common/UserLoading';
import { getDialogTime } from '../../../../../../utils/formatTime';
import { Grid, Typography } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Users = React.memo(({ dialogsArray, selectedDialog, thisAccountId }) => {
	return (
		<div>
			{dialogsArray !== null ? (
				<div>
					{dialogsArray.length > 0 ? (
						<List>
							{dialogsArray.map((dialog) => {
								if (dialog.partner.id === thisAccountId) {
									return (
										<User
											dialogId={dialog.id}
											userId={dialog.initiator.id}
											fullName={`${dialog.initiator.firstName} ${dialog.initiator.lastName}`}
											selectedDialog={selectedDialog}
											time={getDialogTime(dialog.updatedAt)}
											avatar={dialog.initiator.avatar || null}
											isOnline={dialog.initiator.isOnline}
										/>
									);
								} else {
									return (
										<User
											dialogId={dialog.id}
											userId={dialog.partner.id}
											fullName={`${dialog.partner.firstName} ${dialog.partner.lastName}`}
											time={getDialogTime(dialog.updatedAt)}
											selectedDialog={selectedDialog}
											avatar={dialog.partner.avatar || null}
											isOnline={dialog.partner.isOnline}
										/>
									);
								}
							})}
						</List>
					) : (
						<Grid container style={{ paddingTop: '20px' }} direction="column" alignItems="center" justify="center">
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
});

export default Users;
