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

export const fetchUserData = () => (dispatch) => {
  return userAPI
    .getMe()
    .then((res) => {
      if (res.status === 401) {
        dispatch(setIsAuth(false));
        delete window.localStorage.token;
        return;
      }

      dispatch(setUserData(res.data));
      window.localStorage["userId"] = res.data._id;
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
      if ((res.status = 409)) {
        dispatch(setIsAuth(false));
        return false;
      }

      const { token } = res.data;
      window.localStorage["token"] = token;
      window.axios.defaults.headers.common["Authorization"] = token;
      dispatch(setIsAuth(false));
      return true;
    })
    .catch((e) => {
      dispatch(setIsAuth(false));
      return false;
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
