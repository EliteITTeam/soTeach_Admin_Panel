import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import assessmentReducer from "./assessment.reducer";
import userReducer from "./user.reducer";
import dashboardReducer from "./dashboard.reducer";

const rootReducer = combineReducers({
  authReducer,
  assessmentReducer,
  userReducer,
  dashboardReducer,
});

export default rootReducer;
