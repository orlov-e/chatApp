import axios from "./../core/axios";

export const userAPI = {
  getMe(userId) {
    return axios.get(`users/${userId}`);
  },
  register(data) {
    return axios.post("auth/register", data);
  },
  login(data) {
    return axios.post("auth/login", data);
  },
  logout() {
    return axios.post("auth/logout");
  },
  findUsers(query) {
    return axios.post(`users/find?query=${query}`);
  },
  updateAvatar(formDataFile) {
    return axios.post(`users/upload-avatar`, formDataFile);
  },
};
