import { authConstant, assessmentConstant } from "../constants";

const initialState = {
  records: [],
  errors: [],
  sessionExpireError: "",
  loading: false,
  message: "",
  page: 1,
  totalPages: 1,
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case assessmentConstant.CREATE_SUBJECT_REQUEST:
    case assessmentConstant.GET_SUBJECT_REQUEST:
    case assessmentConstant.CREATE_QUIZ_REQUEST:
    case assessmentConstant.GET_QUIZ_REQUEST:
    case assessmentConstant.GET_UNIT_REQUEST:
    case assessmentConstant.GET_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case assessmentConstant.CREATE_SUBJECT_SUCCESS:
    case assessmentConstant.CREATE_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case assessmentConstant.GET_SUBJECT_SUCCESS:
    case assessmentConstant.GET_UNIT_SUCCESS:
    case assessmentConstant.GET_LESSON_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
      };
    case assessmentConstant.GET_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload,
      };
    case assessmentConstant.SESSION_EXPIRE:
      return {
        ...state,
        loading: false,
        sessionExpireError: action.payload.err,
      };
    case assessmentConstant.CREATE_SUBJECT_FAILURE:
    case assessmentConstant.GET_SUBJECT_FAILURE:
    case assessmentConstant.CREATE_QUIZ_FAILURE:
    case assessmentConstant.GET_QUIZ_FAILURE:
    case assessmentConstant.GET_UNIT_FAILURE:
    case assessmentConstant.GET_LESSON_FAILURE:
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
