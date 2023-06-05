import { assessmentConstant } from "./../constants";
import axios from "axios";

export const GetAllSubject = () => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_SUBJECT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/subject/`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_SUBJECT_SUCCESS,
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
          type: assessmentConstant.GET_QUIZ_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateSubject = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_SUBJECT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/subject/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch(GetAllSubject());
      dispatch({
        type: assessmentConstant.CREATE_SUBJECT_SUCCESS,
        payload: `Subject has been created`,
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
          type: assessmentConstant.GET_QUIZ_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetAllQuiz = (subjectId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_QUIZ_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/quiz/${subjectId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_QUIZ_SUCCESS,
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
          type: assessmentConstant.GET_QUIZ_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateQuiz = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_QUIZ_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/quiz/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch(GetAllQuiz(body.subject));
      dispatch({
        type: assessmentConstant.CREATE_QUIZ_SUCCESS,
        payload: `Quiz has been created`,
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
          type: assessmentConstant.GET_QUIZ_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetUnit = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_UNIT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/unit/?subject=${body.subject}&levelName=${body.levelName}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_UNIT_SUCCESS,
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
          type: assessmentConstant.GET_UNIT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateUnit = (body, unitId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.UPDATE_UNIT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/api/unit/${unitId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      // dispatch(GetUnit(unitId));
      dispatch({
        type: assessmentConstant.UPDATE_UNIT_SUCCESS,
        payload: `Unit has been updated`,
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
          type: assessmentConstant.UPDATE_UNIT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetLesson = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_LESSON_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/lesson/?unit=${body}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_LESSON_SUCCESS,
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
          type: assessmentConstant.GET_LESSON_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};