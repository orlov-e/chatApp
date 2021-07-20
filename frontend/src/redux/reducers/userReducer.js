const initialState = {
  userInfo: {
    _id: null,
    firstName: null,
    lastName: null,
    email: null,
  },
  token: window.localStorage.token,
  isAuth: !!window.localStorage.token
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_SET_DATA": {
      return {
        ...state,
        userInfo: payload,
        token: localStorage.token,
        isAuth: true
      };
    }
    case "USER_SET_IS_AUTH": {
      return {
        ...state,
        isAuth: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
