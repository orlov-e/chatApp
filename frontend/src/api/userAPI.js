import axios from "./../core/axios";

export const userAPI = {
  getMe() {
    return axios.get("auth/me");
  },
  register(data) {
    debugger;
    return axios.post("auth/register", data);
  },
  login(data) {
    return axios.post("auth/login", data);
  },
  findUsers(query) {
    return axios.get(`findUsers?query=${query}`);
  },
};
