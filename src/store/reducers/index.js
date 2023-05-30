import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import assessmentReducer from "./assessment.reducer";

const rootReducer = combineReducers({
  authReducer,
  assessmentReducer,
});

export default rootReducer;
