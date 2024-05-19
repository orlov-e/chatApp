import axios from "./../core/axios";

export const dialogsAPI = {
  createDialog(data) {
    return axios.post("/dialogs", data);
  },
  getDialogs() {
    return axios.get("/dialogs");
  },
  deleteDialog(dialogId) {
    return axios.delete(`/dialogs/${dialogId}`);
  }
};
