const initialState = {
  dialogsArray: null,
};

const dialogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "DIALOGS_SET_DATA": {
      return {
        ...state,
        dialogsArray: [...payload],
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogsReducer;
