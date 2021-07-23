import axios from "./../core/axios";

export const messagesAPI = {
  createMessage(data) {
    return axios.post("/dialogs", data);
  },
  getMessages(dialogId) {
    return axios.get(`/message?dialog_id=${dialogId}`);
  },
};
