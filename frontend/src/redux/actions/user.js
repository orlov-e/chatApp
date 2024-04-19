import { jwtDecode } from "jwt-decode";
import { userAPI } from "../../api/userAPI";

const USER_SET_DATA = "USER_SET_DATA";
const USER_SET_IS_AUTH = "USER_SET_IS_AUTH";
const USER_SET_FOUND_USERS = "USER_SET_FOUND_USERS";

const setUserData = (data) => ({
  type: USER_SET_DATA,
  payload: data,
});

const setIsAuth = (bool) => ({
  type: USER_SET_IS_AUTH,
  payload: bool,
});

const setFoundUsers = (data) => ({
  type: USER_SET_FOUND_USERS,
  payload: data,
});

export const fetchUserData = (userId) => (dispatch) => {
  return userAPI
    .getMe(userId)
    .then((res) => {
      if (res.status === 401) {
        dispatch(setIsAuth(false));
        delete window.localStorage.token;
        return;
      }

      dispatch(setUserData(res.data));
    })
    .catch((err) => {
      dispatch(setIsAuth(false));
      delete window.localStorage.token;
    });
};
export const fetchUserLogin = (postData) => (dispatch) => {
  return userAPI
    .login(postData)
    .then(({ data }) => {
      const { token } = data;
      const decodedToken = jwtDecode(token);
      window.localStorage["userId"] = decodedToken.id;
      window.localStorage["token"] = token;
      window.axios.defaults.headers.common["Authorization"] = token;
      dispatch(setIsAuth(true));
      return true;
    })
    .catch((e) => {
      return false;
    });
};
export const fetchUserRegister = (postData) => (dispatch) => {
  return userAPI
    .register(postData)
    .then((res) => {
      dispatch(setIsAuth(false));
      if (res.status === 409) {
        return false;
      } else if (res.status === 201) {
        return true;
      }
    })
    .catch((e) => {
      dispatch(setIsAuth(false));
    });
};

export const fetchUserLogout = (query) => (dispatch) => {
  return userAPI.logout().then((res) => {
    if (res.status === 200) {
      dispatch(setIsAuth(false));
      delete window.localStorage.token;
    }
  });
};

export const fetchFindUsers = (query) => (dispatch) => {
  return userAPI.findUsers(query).then(({ data }) => {
    dispatch(setFoundUsers(data));
  });
};

export const updateUserAvatar = (avatar) => (dispatch) => {
  const fd = new FormData();
  fd.append("image", avatar, avatar.name);
  return userAPI.updateAvatar(fd).then((res) => {
    if (res.status === 404) {
      return false;
    }
    dispatch(fetchUserData());
  });
};
