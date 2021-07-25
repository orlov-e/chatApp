import React from "react";
import { useDispatch } from "react-redux";
import { Link }  from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Status from "../../../../../../common/Status";
import { makeStyles } from "@material-ui/core/styles";
import { fetchMessagesData } from "../../../../../../redux/actions/messages";

const User = ({ userId, firstName, lastName, photo, isOnline, dialogId , selected }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleOnClick = () => {
    dispatch(fetchMessagesData(dialogId));
  };

  return (
    <div>
    <Link to={"/dialog/" + dialogId} className={classes.Link} onClick={handleOnClick}>
      <ListItem button key={userId}>
        <ListItemIcon>
          <Avatar
            alt={`${firstName} ${lastName}`}
            src={photo != null ? photo : "/static/images/avatar/1.jpg"}
          />
          {isOnline ? <Status /> : <div></div>}
        </ListItemIcon>
        <ListItemText>{`${firstName} ${lastName}`}</ListItemText>
      </ListItem>
    </Link>
    </div>
  );
};

export default User;

const useStyles = makeStyles({
  Link: {
    textDecoration: "none",
    color: "black",
  },
});
