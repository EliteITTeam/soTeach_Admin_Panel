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
  ageReport: [],
  eventList: [],
  page: 1,
  totalPages: 1,
  message: "",
  errors: [],
};

const assessmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstant.CREATE_EVENT_REQUEST:
    case dashboardConstant.GET_EVENT_LIST_REQUEST:
    case dashboardConstant.DELETE_EVENT_LIST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstant.GET_SUBJECT_REPORT_REQUEST:
    case dashboardConstant.GET_COUNT_BY_LEVEL_REQUEST:
    case dashboardConstant.GET_COUNT_BY_GENDER_REQUEST:
    case dashboardConstant.GET_COUNT_BY_AGE_REQUEST:
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
    case dashboardConstant.DELETE_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case dashboardConstant.GET_EVENT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        eventList: action.payload.results,
        page: action.payload.page,
        totalPages: action.payload.totalPages,
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
    case dashboardConstant.GET_COUNT_BY_AGE_SUCCESS:
      return {
        ...state,
        reportLoading: false,
        ageReport: action.payload,
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
    case dashboardConstant.GET_COUNT_BY_AGE_FAILURE:
    case dashboardConstant.GET_EVENT_LIST_FAILURE:
    case dashboardConstant.DELETE_EVENT_LIST_FAILURE:
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
