import { assessmentConstant } from "./../constants";
import axios from "axios";

export const GetAllSubject = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_SUBJECT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/subject/?page=${body}&limit=5`,
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
      dispatch(GetAllSubject(1));
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

export const GetAllQuiz = (subjectId, page) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_QUIZ_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/quiz/?subject=${subjectId}&page=${page}&limit=5`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_QUIZ_SUCCESS,
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
      dispatch(GetAllQuiz(body.subject, 1));
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

export const CreateQuestion = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/question/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch({
        type: assessmentConstant.CREATE_QUESTION_SUCCESS,
        payload: `Question has been created`,
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
          type: assessmentConstant.CREATE_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateAboutUs = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_ABOUT_US_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/about/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch({
        type: assessmentConstant.CREATE_ABOUT_US_SUCCESS,
        payload: `About us has been created`,
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
          type: assessmentConstant.CREATE_ABOUT_US_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateBlog = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_BLOG_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/blog/`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch({
        type: assessmentConstant.CREATE_BLOG_SUCCESS,
        payload: `Blog has been created`,
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
          type: assessmentConstant.CREATE_BLOG_FAILURE,
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

export const UpdateLesson = (body, lessonId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.UPDATE_LESSON_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/api/lesson/${lessonId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: assessmentConstant.UPDATE_LESSON_SUCCESS,
        payload: `Lesson has been updated`,
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
          type: assessmentConstant.UPDATE_LESSON_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetExercise = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_EXERCISE_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/exercise/?lesson=${body}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_EXERCISE_SUCCESS,
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
          type: assessmentConstant.GET_EXERCISE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetQuestion = (body, page) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/question/?exercise=${body}&page=${page}&limit=5`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_QUESTION_SUCCESS,
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
          type: assessmentConstant.GET_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetFinalQuestion = (subjectId, page) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_FINAL_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/examQuestion/?subject=${subjectId}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_FINAL_QUESTION_SUCCESS,
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
          type: assessmentConstant.GET_FINAL_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateFinalQuestions = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_FINAL_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${process.env.REACT_APP_ROOT}/api/examQuestion/`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: assessmentConstant.CREATE_FINAL_QUESTION_SUCCESS,
        payload: `Question has been created`,
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
          type: assessmentConstant.CREATE_FINAL_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetUnitQuestion = (unitId, page) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.GET_UNIT_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/unitQuestion/?unit=${unitId}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: assessmentConstant.GET_UNIT_QUESTION_SUCCESS,
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
          type: assessmentConstant.GET_UNIT_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateUnitQuestions = (body) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.CREATE_UNIT_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${process.env.REACT_APP_ROOT}/api/unitQuestion/`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: assessmentConstant.CREATE_UNIT_QUESTION_SUCCESS,
        payload: `Question has been created`,
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
          type: assessmentConstant.CREATE_UNIT_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeleteSubject = (subjectId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.DELETE_SUBJECT_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_ROOT}/api/subject/${subjectId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllSubject(1));
      dispatch({
        type: assessmentConstant.DELETE_SUBJECT_SUCCESS,
        payload: `Subject has been deleted`,
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
          type: assessmentConstant.DELETE_SUBJECT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeleteQuiz = (quizId, subjectId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.DELETE_QUIZ_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_ROOT}/api/quiz/delete/${quizId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetAllQuiz(subjectId, 1));
      dispatch({
        type: assessmentConstant.DELETE_QUIZ_SUCCESS,
        payload: `Quiz has been deleted`,
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
          type: assessmentConstant.DELETE_QUIZ_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const DeleteExercise = (lessonId, questionId) => {
  return async (dispatch) => {
    dispatch({ type: assessmentConstant.DELETE_QUESTION_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.delete(
        `${process.env.REACT_APP_ROOT}/api/question/${questionId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch(GetQuestion(lessonId, 1));
      dispatch({
        type: assessmentConstant.DELETE_QUESTION_SUCCESS,
        payload: `Question has been deleted`,
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
          type: assessmentConstant.DELETE_QUESTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
