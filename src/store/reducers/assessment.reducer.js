import { authConstant, assessmentConstant } from "../constants";

const initialState = {
  records: [],
  errors: [],
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
    case assessmentConstant.CREATE_SUBJECT_FAILURE:
    case assessmentConstant.GET_SUBJECT_FAILURE:
    case assessmentConstant.CREATE_QUIZ_FAILURE:
    case assessmentConstant.GET_QUIZ_FAILURE:
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
      };
    default:
      return state;
  }
};

export default assessmentReducer;
