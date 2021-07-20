import axios from "axios";

export const dialogsAPI = {
  createDialog(data) {
    return axios.post("/dialogs", data);
  },
  getDialogs() {
    return axios.get("/dialogs");
  },
};
