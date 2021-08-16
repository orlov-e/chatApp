import axios from "./../core/axios";

export const userAPI = {
  getMe() {
    return axios.get("auth/me");
  },
  register(data) {
    return axios.post("auth/register", data);
  },
  login(data) {
    return axios.post("auth/login", data);
  },
  logout() {
    return axios.get("auth/logout");
  },
  findUsers(query) {
    return axios.get(`findUsers?query=${query}`);
  },
  updateAvatar(formDataFile) {
    return axios.post(`upload_avatar`, formDataFile);
  },
};
