const initialState = {
  dialogsArray: null,
  selectedDialog: window.location.pathname.split("dialog/")[1],
};

const dialogsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "DIALOGS_SET_DATA": {
      return {
        ...state,
        dialogsArray: [...payload],
      };
    }
    case "DIALOGS_SET_SELECTED_DIALOG": {
      return {
        ...state,
        selectedDialog: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default dialogsReducer;
