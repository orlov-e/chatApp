const initialState = {
  dialogsArray: null,
  foundDialogs: null,
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
    case "DIALOGS_SET_FIND_DIALOGS": {
      const foundDialogs = state.dialogsArray.filter(
        (dialog) =>
          dialog.initiator.fullName.search(new RegExp(payload, "i")) !== -1 ||
          dialog.partner.fullName.search(new RegExp(payload, "i")) !== -1
      );

      return {
        ...state,
        foundDialogs: payload ? [...foundDialogs] : null,
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
