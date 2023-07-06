import {
  authConstant,
  assessmentConstant,
  dashboardConstant,
} from "../constants";

const initialState = {
  loading: false,
  reportLoading: false,
  subjectReport: [],
  levelReport: [],
  genderReport: [],
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
    case dashboardConstant.GET_SUBJECT_REPORT_REQUEST:
    case dashboardConstant.GET_COUNT_BY_LEVEL_REQUEST:
    case dashboardConstant.GET_COUNT_BY_GENDER_REQUEST:
      return {
        ...state,
        reportLoading: true,
      };
    case dashboardConstant.GET_SUBJECT_REPORT_SUCCESS:
      return {
        ...state,
        reportLoading: false,
        subjectReport: action.payload,
      };
    case dashboardConstant.GET_COUNT_BY_LEVEL_SUCCESS:
      return {
        ...state,
        reportLoading: false,
        levelReport: action.payload,
      };
    case dashboardConstant.GET_COUNT_BY_GENDER_SUCCESS:
      return {
        ...state,
        reportLoading: false,
        genderReport: action.payload,
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
    case dashboardConstant.GET_COUNT_BY_LEVEL_FAILURE:
    case dashboardConstant.GET_COUNT_BY_GENDER_FAILURE:
      return {
        ...state,
        reportLoading: false,
        loading: false,
        errors: action.payload.err,
      };
    case authConstant.CLEAR_MESSAGES:
      return {
        ...state,
        reportLoading: false,
        loading: false,
        message: "",
      };
    case authConstant.CLEAR_ERRORS:
      return {
        ...state,
        reportLoading: false,
        loading: false,
        errors: [],
        sessionExpireError: "",
      };
    default:
      return state;
  }
};

export default assessmentReducer;
