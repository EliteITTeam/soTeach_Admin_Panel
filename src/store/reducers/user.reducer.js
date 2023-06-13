import { authConstant, assessmentConstant, userConstant } from "../constants";

const initialState = {
  records: [],
  errors: [],
  loading: false,
  sessionExpireError: "",
  chatConnection: {},
  userInfo: {},
  message: "",
  page: 1,
  totalPages: 1,
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_ALL_USER_REQUEST:
    case userConstant.RESET_PASSWORD_REQUEST:
    case userConstant.CREATE_CHAT_CONNECTION_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case userConstant.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case userConstant.CREATE_CHAT_CONNECTION_SUCCESS:
      return {
        ...state,
        loading: false,
        chatConnection: action.payload.results,
      };
    case userConstant.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case assessmentConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case userConstant.GET_ALL_USER_FAILURE:
    case userConstant.RESET_PASSWORD_FAILURE:
    case userConstant.CREATE_CHAT_CONNECTION_FAILURE:
    case userConstant.ADD_MESSAGE_FAILURE:
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
