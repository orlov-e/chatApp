import React from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "../../../../../../common/Dialog/DialogTitle";
import Avatar from "../../../../../../common/Avatar";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { Grid } from "@material-ui/core";
import {
  fetchUserLogout,
  updateUserAvatar,
} from "../../../../../../redux/actions/user";

export default function ProfieSettings({ handleClose, open, avatar }) {
  const dispatch = useDispatch();

  const [img, setImg] = React.useState(null);
  const [currentImg, setCurrentImg] = React.useState(null);

  const handleSetAvatar = () => {
    dispatch(updateUserAvatar(img)).then(() => {
      handleClose();
      setImg(null);
    });
  };

  const setNewPhoto = (e) => {
    setImg(e.target.files[0]);
    setCurrentImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleLogout = () => {
    return dispatch(fetchUserLogout());
  };

  return (
    <div>
      <Dialog
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Profile settings
        </DialogTitle>
        <DialogContent dividers>
          <Grid
            container
            spacing={1}
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <Avatar avatar={currentImg ? currentImg : avatar} />
            </Grid>
            <p>(180x180)</p>
            <br />
            <Grid item>
              <Button variant="contained" component="label">
                Change photo
                <div onChange={setNewPhoto}>
                  <input
                    accept="image/*"
                    id="upload-avatar"
                    type="file"
                    hidden
                  />
                </div>
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-start">
            <Button
              onClick={handleLogout}
              color="secondary"
            >
              Logout
            </Button>
          </Grid>
          <Grid container justify="flex-end">
            <Button
              autoFocus
              disabled={!img}
              onClick={handleSetAvatar}
              color="primary"
            >
              Save changes
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
}
