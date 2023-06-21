import { authConstant } from "../constants";

const initialState = {
  errors: [],
  loading: false,
  message: "",
  logOutLoading: false,
  logOutMessage: "",
  logOutErrors: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstant.ADMIN_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case authConstant.ADMIN_LOGOUT_REQUEST:
      return {
        ...state,
        logOutLoading: true,
      };
    case authConstant.ADMIN_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case authConstant.ADMIN_LOGOUT_SUCCESS:
      return {
        ...state,
        logOutLoading: false,
        logOutMessage: action.payload,
      };
    case authConstant.ADMIN_LOGIN_FAILURE:
    case authConstant.ADMIN_CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.ADMIN_LOGOUT_FAILURE:
      return {
        ...state,
        logOutLoading: false,
        logOutErrors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        loading: false,
        message: "",
        logOutMessage: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        errors: [],
        logOutErrors: [],
      };
    default:
      return state;
  }
};

export default authReducer;
