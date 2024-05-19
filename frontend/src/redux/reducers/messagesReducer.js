const initialState = {
  messagesArray: [],
};

const messagesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "MESSAGES_SET_DATA": {
      return {
        ...state,
        messagesArray: [...payload],
      };
    }
    case "MESSAGES_ADD_MESSAGE": {
      debugger;
      return {
        ...state,
        messagesArray: [...state.messagesArray, payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default messagesReducer;
