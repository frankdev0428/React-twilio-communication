import { combineReducers } from "redux";
import inboxReducer from "./Reducers/InboxReducer/inboxSlice";
import customerReducer from "./Reducers/CustomerReducer/customerSlice"
import callReducer from "./Reducers/CallReducer/callSlice"
import helpReducer from "./Reducers/HelpReducer/helpSlice"
import userReducer from "./Reducers/UserReducer/userSlice"

const rootReducer = combineReducers({
  inbox: inboxReducer,
  customer: customerReducer,
  call: callReducer,
  help: helpReducer,
  user: userReducer
});

export default rootReducer;
