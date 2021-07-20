import { userAPI } from "../../api/userAPI";

const USER_SET_DATA = "USER_SET_DATA";
const USER_SET_IS_AUTH = "USER_SET_IS_AUTH";

const setUserData = (data) => ({
  type: USER_SET_DATA,
  payload: data,
});

const setIsAuth = (bool) => ({
  type: USER_SET_IS_AUTH,
  payload: bool,
});

export const fetchUserData = () => (dispatch) => {
  return userAPI
    .getMe()
    .then(({ data }) => {
      dispatch(setUserData(data));
    })
    .catch((err) => {
      if (err.response.status === 401) {
        dispatch(setIsAuth(false));
        delete window.localStorage.token;
      }
    });
};
export const fetchUserLogin = (postData) => (dispatch) => {
  return userAPI
    .login(postData)
    .then(({ data }) => {
      debugger;
      const { token } = data;
      window.localStorage["token"] = token;
      window.axios.defaults.headers.common["Authorization"] = token;
      dispatch(setIsAuth(true));
      return data;
    })
    .catch(({ response }) => {
      return false;
    });
};
export const fetchUserRegister = (postData) => (dispatch) => {
  return userAPI
    .register(postData)
    .then(({ data }) => {
      const { token } = data;
      window.localStorage["token"] = token;
      window.axios.defaults.headers.common["Authorization"] = token;
      dispatch(setIsAuth(false));
      return data;
    })
    .catch(({ response }) => {
      if ((response.status = 409)) {
        return false;
      }
    });
};
