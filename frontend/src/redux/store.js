import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import userReducer from "./reducers/userReducer";
import dialogsReducer from "./reducers/dialogsReducer";

let reducers = combineReducers({
  user: userReducer,
  dialogs: dialogsReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;
