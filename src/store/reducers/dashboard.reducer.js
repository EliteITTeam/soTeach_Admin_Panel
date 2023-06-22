import {
  authConstant,
  assessmentConstant,
  dashboardConstant,
} from "../constants";

const initialState = {
  loading: false,
  message: "",
  errors: [],
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstant.CREATE_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.CREATE_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case assessmentConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case dashboardConstant.CREATE_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default assessmentReducer;
