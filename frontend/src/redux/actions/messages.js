import { messagesAPI } from '../../api/messagesAPI';
import { setSelectedDialog } from './dialogs';

const MESSAGES_SET_DATA = 'MESSAGES_SET_DATA';

const setMessagesData = (data) => ({
	type: MESSAGES_SET_DATA,
	payload: data,
});

export const addMessage = (message) => (dispatch, getState) => {
	const { dialogs } = getState();
	const { selectedDialog } = dialogs;
	if (selectedDialog === message.dialogId) {
		dispatch({
			type: 'MESSAGES_ADD_MESSAGE',
			payload: message,
		});
	}
};

export const fetchMessagesData = (dialogId) => (dispatch) => {
	return messagesAPI
		.getMessages(dialogId)
		.then(({ data }) => {
			dispatch(setMessagesData(data));
			dispatch(setSelectedDialog(dialogId));
		})
		.catch(() => {
			dispatch(setMessagesData([]));
		});
};

export const fetchSendMessage =
	({ text, dialogId }) =>
	(dispatch) => {
		return messagesAPI.sendMessage(text, dialogId);
	};
