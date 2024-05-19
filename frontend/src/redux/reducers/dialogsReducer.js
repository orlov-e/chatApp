const initialState = {
	dialogsArray: null,
	foundDialogs: null,
	selectedDialog: window.location.pathname.split('dialog/')[1],
};

const dialogsReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'DIALOGS_SET_DATA': {
			return {
				...state,
				dialogsArray: [...payload],
			};
		}
		case 'DIALOGS_SET_FIND_DIALOGS': {
			const foundDialogs = state.dialogsArray.filter((dialog) => {
				const initiatorFullName = `${dialog.initiator.firstName} ${dialog.initiator.lastName}`;
				const partnerFullName = `${dialog.partner.firstName} ${dialog.partner.lastName}`;
				return (
          initiatorFullName.search(new RegExp(payload, 'i')) !== -1 ||
					partnerFullName.search(new RegExp(payload, 'i')) !== -1
				);
			});
      debugger;
      
			return {
				...state,
				foundDialogs: payload ? [...foundDialogs] : null,
			};
		}
		case 'DIALOGS_SET_SELECTED_DIALOG': {
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
