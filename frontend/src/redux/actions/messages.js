import { messagesAPI } from "../../api/messagesAPI";

const MESSAGES_SET_DATA = "MESSAGES_SET_DATA";
const MESSAGES_SET_NULL = "MESSAGES_SET_NULL";

const setMessagesData = (data) => ({
  type: MESSAGES_SET_DATA,
  payload: data,
});

const setNoMessages = (data) => ({
  type: MESSAGES_SET_NULL,
  payload: data,
});

export const fetchMessagesData = (dialogId) => (dispatch) => {
  return messagesAPI
    .getMessages(dialogId)
    .then(({ data }) => {
      dispatch(setMessagesData(data));
      if (data.length === 0) {
        dispatch(setNoMessages(null));
      }
    }).catch(() => {
      dispatch(setNoMessages(null));
    })
};
