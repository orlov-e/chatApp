import { dialogsAPI } from "../../api/dialogsAPI";

const DIALOGS_SET_DATA = "DIALOGS_SET_DATA";
const DIALOGS_SET_SELECTED_DIALOG = "DIALOGS_SET_SELECTED_DIALOG";
const DIALOGS_SET_FIND_DIALOGS = "DIALOGS_SET_FIND_DIALOGS";

export const setDialogsData = (data) => ({
  type: DIALOGS_SET_DATA,
  payload: data,
});

export const setSelectedDialog = (data) => ({
  type: DIALOGS_SET_SELECTED_DIALOG,
  payload: data,
});

export const setFindDialogs = (query) => ({
  type: DIALOGS_SET_FIND_DIALOGS,
  payload: query,
});

export const fetchDialogsData = () => (dispatch) => {
  return dialogsAPI
    .getDialogs()
    .then((res) => {
      if (res.status === 404) {
        dispatch(setDialogsData(null));
      }

      dispatch(setDialogsData(res.data));
    })
    .catch((e) => {
      dispatch(setDialogsData([]));
    });
};

export const fetchCreateDialog = (partner, text) => (dispatch) => {
  return dialogsAPI.createDialog({ partner, text });
};
