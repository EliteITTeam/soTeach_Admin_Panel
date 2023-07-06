import { authConstant, assessmentConstant } from "../constants";

const initialState = {
  records: [],
  errors: [],
  sessionExpireError: "",
  loading: false,
  aboutLoading: false,
  blogLoading: false,
  message: "",
  page: 1,
  totalPages: 1,
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case assessmentConstant.CREATE_SUBJECT_REQUEST:
    case assessmentConstant.GET_SUBJECT_REQUEST:
    case assessmentConstant.CREATE_QUIZ_REQUEST:
    case assessmentConstant.CREATE_QUESTION_REQUEST:
    case assessmentConstant.GET_QUIZ_REQUEST:
    case assessmentConstant.GET_UNIT_REQUEST:
    case assessmentConstant.GET_LESSON_REQUEST:
    case assessmentConstant.UPDATE_UNIT_REQUEST:
    case assessmentConstant.UPDATE_LESSON_REQUEST:
    case assessmentConstant.GET_EXERCISE_REQUEST:
    case assessmentConstant.GET_QUESTION_REQUEST:
    case assessmentConstant.GET_FINAL_QUESTION_REQUEST:
    case assessmentConstant.CREATE_FINAL_QUESTION_REQUEST:
    case assessmentConstant.GET_UNIT_QUESTION_REQUEST:
    case assessmentConstant.CREATE_UNIT_QUESTION_REQUEST:
    case assessmentConstant.DELETE_SUBJECT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case assessmentConstant.CREATE_ABOUT_US_REQUEST:
      return {
        ...state,
        aboutLoading: true,
      };
    case assessmentConstant.CREATE_BLOG_REQUEST:
      return {
        ...state,
        blogLoading: true,
      };
    case assessmentConstant.CREATE_SUBJECT_SUCCESS:
    case assessmentConstant.CREATE_QUIZ_SUCCESS:
    case assessmentConstant.UPDATE_UNIT_SUCCESS:
    case assessmentConstant.UPDATE_LESSON_SUCCESS:
    case assessmentConstant.CREATE_QUESTION_SUCCESS:
    case assessmentConstant.CREATE_ABOUT_US_SUCCESS:
    case assessmentConstant.CREATE_BLOG_SUCCESS:
    case assessmentConstant.CREATE_FINAL_QUESTION_SUCCESS:
    case assessmentConstant.CREATE_UNIT_QUESTION_SUCCESS:
    case assessmentConstant.DELETE_SUBJECT_SUCCESS:
      return {
        ...state,
        blogLoading: false,
        aboutLoading: false,
        loading: false,
        message: action.payload,
      };
    case assessmentConstant.GET_SUBJECT_SUCCESS:
    case assessmentConstant.GET_UNIT_SUCCESS:
    case assessmentConstant.GET_LESSON_SUCCESS:
    case assessmentConstant.GET_QUIZ_SUCCESS:
    case assessmentConstant.GET_EXERCISE_SUCCESS:
    case assessmentConstant.GET_QUESTION_SUCCESS:
    case assessmentConstant.GET_FINAL_QUESTION_SUCCESS:
    case assessmentConstant.GET_UNIT_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        records: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
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
    case assessmentConstant.UPDATE_UNIT_FAILURE:
    case assessmentConstant.UPDATE_LESSON_FAILURE:
    case assessmentConstant.GET_EXERCISE_FAILURE:
    case assessmentConstant.GET_QUESTION_FAILURE:
    case assessmentConstant.CREATE_QUESTION_FAILURE:
    case assessmentConstant.CREATE_ABOUT_US_FAILURE:
    case assessmentConstant.CREATE_BLOG_FAILURE:
    case assessmentConstant.GET_FINAL_QUESTION_FAILURE:
    case assessmentConstant.CREATE_FINAL_QUESTION_FAILURE:
    case assessmentConstant.GET_UNIT_QUESTION_FAILURE:
    case assessmentConstant.CREATE_UNIT_QUESTION_FAILURE:
    case assessmentConstant.DELETE_SUBJECT_FAILURE:
      return {
        ...state,
        blogLoading: false,
        aboutLoading: false,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        blogLoading: false,
        aboutLoading: false,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        blogLoading: false,
        aboutLoading: false,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default assessmentReducer;
