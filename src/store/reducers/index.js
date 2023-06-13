import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import assessmentReducer from "./assessment.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  authReducer,
  assessmentReducer,
  userReducer,
});

export default rootReducer;
