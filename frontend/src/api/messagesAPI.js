import axios from './../core/axios';

export const messagesAPI = {
	sendMessage(text, dialogId) {
		return axios.post('/messages', { text, dialogId });
	},
	getMessages(dialogId) {
		return axios.get(`/messages?dialogid=${dialogId}`);
	},
};
