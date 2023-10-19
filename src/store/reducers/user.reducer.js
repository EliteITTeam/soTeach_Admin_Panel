import { authConstant, assessmentConstant, userConstant } from "../constants";

const initialState = {
  records: [],
  errors: [],
  loading: false,
  logoutLoading: false,
  uploadLoading: false,
  sessionExpireError: "",
  chatConnection: {},
  userInfo: {},
  userResult:{},
  unitResult:{},
  lessonResult:{},
  exerciseResult:{},
  message: "",
  page: 1,
  totalPages: 1,
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstant.GET_ALL_USER_REQUEST:
    case userConstant.RESET_PASSWORD_REQUEST:
    case userConstant.CREATE_CHAT_CONNECTION_REQUEST:
    case userConstant.GET_REQUESTED_USER_REQUEST:
    case userConstant.UPDATE_USER_STATUS_REQUEST:
    case userConstant.DELETE_SINGLE_USER_REQUEST:
    case userConstant.UPDATE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstant.LOGOUT_USER_REQUEST:
      return {
        ...state,
        logoutLoading: true,
      };
    case userConstant.UPLOAD_CERTIFICATE_REQUEST:
      return {
        ...state,
        uploadLoading: true,
      };
    case userConstant.GET_ALL_USER_SUCCESS:
    case userConstant.GET_REQUESTED_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case userConstant.RESET_PASSWORD_SUCCESS:
    case userConstant.UPDATE_USER_STATUS_SUCCESS:
    case userConstant.DELETE_SINGLE_USER_SUCCESS:
    case userConstant.LOGOUT_USER_SUCCESS:
    case userConstant.UPDATE_USER_SUCCESS:
    case userConstant.UPLOAD_CERTIFICATE_SUCCESS:
      return {
        ...state,
        uploadLoading: false,
        logoutLoading: false,
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
    case userConstant.GET_USER_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        userResult: action.payload,
      };
    case userConstant.GET_UNIT_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        unitResult: action.payload,
      };
    case userConstant.GET_LESSON_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        lessonResult: action.payload,
      };
    case userConstant.GET_EXERCISE_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        exerciseResult: action.payload,
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
    case userConstant.GET_REQUESTED_USER_FAILURE:
    case userConstant.UPDATE_USER_STATUS_FAILURE:
    case userConstant.DELETE_SINGLE_USER_FAILURE:
    case userConstant.LOGOUT_USER_FAILURE:
    case userConstant.UPDATE_USER_FAILURE:
    case userConstant.UPLOAD_CERTIFICATE_FAILURE:
    case userConstant.GET_USER_INFO_FAILURE:
    case userConstant.GET_USER_RESULT_FAILURE:
    case userConstant.GET_UNIT_RESULT_FAILURE:
    case userConstant.GET_LESSON_RESULT_FAILURE:
      return {
        ...state,
        uploadLoading: false,
        logoutLoading: false,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        uploadLoading: false,
        logoutLoading: false,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        uploadLoading: false,
        logoutLoading: false,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default assessmentReducer;
