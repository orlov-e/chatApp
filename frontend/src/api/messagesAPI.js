import axios from "./../core/axios";

export const messagesAPI = {
  sendMessage(text, dialogId) {
    return axios.post("/message", { text, dialogId });
  },
  getMessages(dialogId) {
    return axios.get(`/message?dialog_id=${dialogId}`);
  },
};
