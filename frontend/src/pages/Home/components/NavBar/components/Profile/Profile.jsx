import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import UserLoading from '../../../../../../common/UserLoading';
import ProfileSettings from './ProfileSettings';

const Profile = React.memo(({ id, firstName, lastName, avatar }) => {
	const fullName = `${firstName} ${lastName}`;
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			{id ? (
				<List>
					<ListItem key={id} button onClick={handleClickOpen}>
						<ListItemIcon Button size="small" color="secondary" aria-label="add">
							<Avatar alt={fullName} src={avatar ? avatar : '/static/images/avatar/1.jpg'} />
						</ListItemIcon>
						<ListItemText primary={fullName}></ListItemText>
					</ListItem>
				</List>
			) : (
				<UserLoading />
			)}
			<ProfileSettings userID={id} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} />
		</div>
	);
});

export default Profile;
