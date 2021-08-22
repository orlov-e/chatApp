const initialState = {
  userInfo: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token,
  foundUsers: [],
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_SET_DATA": {
      return {
        ...state,
        userInfo: payload,
        token: localStorage.token,
        isAuth: true,
      };
    }
    case "USER_SET_IS_AUTH": {
      return {
        ...state,
        isAuth: payload,
      };
    }
    case "USER_SET_FOUND_USERS": {
      return {
        ...state,
        foundUsers: [...payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
