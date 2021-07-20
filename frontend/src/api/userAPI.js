import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001/api";
axios.defaults.headers.common["Authorization"] = window.localStorage.token;
window.axios = axios;

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
};
