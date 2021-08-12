import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  root: {
    width: "180px",
    height: "180px",
  },
});

const Avatar = withStyles(styles)((props) => {
  const { avatar, currentImg, children, classes, onClose, ...other } = props;

  return (
    <img
      onError={"error"}
      className={classes.root}
      src={currentImg ? currentImg : avatar}
      alt=""
      {...other}
    ></img>
  );
});

export default Avatar;
