import { dialogsAPI } from "../../api/dialogsAPI";

const DIALOGS_SET_DATA = "DIALOGS_SET_DATA";
const DIALOGS_SET_SELECTED_DIALOG = "MESSAGES_SET_SELECTED_DIALOG";

const setDialogsData = (data) => ({
  type: DIALOGS_SET_DATA,
  payload: data,
});

export const setSelectedDialog = (data) => ({
  type: DIALOGS_SET_SELECTED_DIALOG,
  payload: data,
});

export const fetchDialogsData = () => (dispatch) => {
  return dialogsAPI
    .getDialogs()
    .then(({ data }) => {
      dispatch(setDialogsData(data));
    })
    .catch((err) => {
      if (err.response.status === 404) {
        dispatch(setDialogsData(null));
      }
    });
};
