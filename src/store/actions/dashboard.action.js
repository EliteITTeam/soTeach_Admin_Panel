import { dashboardConstant, assessmentConstant } from "./../constants";
import axios from "axios";

export const CreateEvent = (body) => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.CREATE_EVENT_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/events/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch({
        type: dashboardConstant.CREATE_EVENT_SUCCESS,
        payload: "Event has been created",
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.CREATE_EVENT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const SubjectReport = () => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.GET_SUBJECT_REPORT_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth/user/subject`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_SUBJECT_REPORT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.GET_SUBJECT_REPORT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CountByLevel = () => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.GET_COUNT_BY_LEVEL_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth//user/level`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_COUNT_BY_LEVEL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.GET_COUNT_BY_LEVEL_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CountByGender = () => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.GET_COUNT_BY_GENDER_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth//user/gender`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_COUNT_BY_GENDER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.GET_COUNT_BY_GENDER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CountByAge = () => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.GET_COUNT_BY_AGE_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth/user/age`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_COUNT_BY_AGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.GET_COUNT_BY_AGE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const EventList = (page) => {
  return async (dispatch) => {
    dispatch({
      type: dashboardConstant.GET_EVENT_LIST_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/events/?page=${page}&limit=5`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: dashboardConstant.GET_EVENT_LIST_SUCCESS,
        payload: {
          results: data.results,
          page: data.page,
          totalPages: data.totalPages,
        },
      });
    } catch (error) {
      if (error.response.data.code === 401) {
        localStorage.clear();
        dispatch({
          type: assessmentConstant.SESSION_EXPIRE,
          payload: { err: "Session has been expired" },
        });
      } else {
        dispatch({
          type: dashboardConstant.GET_EVENT_LIST_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
