import React from "react";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";

const SnackBar = ({ text, alert, handleAlert }) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={alert}
      autoHideDuration={3000}
      onClose={handleAlert}
    >
      <Alert onClose={handleAlert} severity="error">
        {text}
      </Alert>
    </Snackbar>
  );
};

export default SnackBar;
