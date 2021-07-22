const initialState = {
  messagesArray: null,
};

const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "MESSAGES_SET_DATA": {
      return {
        ...state,
        messagesArray: [...payload],
      };
    }
    case "MESSAGES_SET_NULL": {
      return {
        messagesArray: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default messagesReducer;
