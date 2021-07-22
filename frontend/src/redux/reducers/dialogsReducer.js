const initialState = {
  dialogsArray: null,
  currentDialog: window.location.pathname.split("/dialog/")[1],
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
