import { userConstant, assessmentConstant } from "./../constants";
import axios from "axios";
import { sendMessage } from "./../../firebase";

export const GetAllUser = (body, page) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_ALL_USER_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      let result;
      if (page) {
        result = await axios.get(
          `${process.env.REACT_APP_ROOT}/api/auth?isVerified=${body}&page=${page}&limit=10`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      } else {
        result = await axios.get(
          `${process.env.REACT_APP_ROOT}/api/auth?isVerified=${body}`,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : "",
            },
          }
        );
      }
      const { data } = result;
      dispatch({
        type: userConstant.GET_ALL_USER_SUCCESS,
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
          type: userConstant.GET_ALL_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const GetRequestedUser = (body, page) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_REQUESTED_USER_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth?isVerified=${body}&page=${page}&limit=10`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_REQUESTED_USER_SUCCESS,
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
          type: userConstant.GET_REQUESTED_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const ResetPassword = (body, userId) => {
  return async (dispatch) => {
    dispatch({ type: userConstant.RESET_PASSWORD_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(
        `${process.env.REACT_APP_ROOT}/api/auth/admin/resetpassword/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      dispatch({
        type: userConstant.RESET_PASSWORD_SUCCESS,
        payload: "Password has been reset",
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
          type: userConstant.RESET_PASSWORD_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const CreateChatConnection = (body) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.CREATE_CHAT_CONNECTION_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");

      let result = await axios.post(
        `${process.env.REACT_APP_ROOT}/api/chatConnection/create`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.CREATE_CHAT_CONNECTION_SUCCESS,
        payload: {
          results: data,
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
          type: userConstant.CREATE_CHAT_CONNECTION_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateUserStatus = (body, userId) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.UPDATE_USER_STATUS_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");

      await axios.post(
        `${process.env.REACT_APP_ROOT}/api/auth/updatestatus/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: userConstant.UPDATE_USER_STATUS_SUCCESS,
        payload: "Status has been updated",
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
          type: userConstant.UPDATE_USER_STATUS_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const getUserInfo = (body) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("adminToken");
      let result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth/users/${body}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_USER_INFO_SUCCESS,
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
          type: userConstant.GET_USER_INFO_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const getUserResult = (userID, subjectID) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("adminToken");
      let result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/result/?user=${userID}`,
       
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_USER_RESULT_SUCCESS,
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
          type: userConstant.GET_USER_RESULT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const getUnitResult = (userID, subjectID) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("adminToken");
      let result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/result/unit/?user=${userID}&subject=${subjectID}&level=BEGINNER&type=unit`,
       
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_UNIT_RESULT_SUCCESS,
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
          type: userConstant.GET_UNIT_RESULT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const getLessonResult = (userID, unit) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("adminToken");
      let result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/result/lesson/?user${userID}&unit=${unit}&type=lesson`,
       
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_LESSON_RESULT_SUCCESS,
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
          type: userConstant.GET_LESSON_RESULT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const getExerciseResult = (userID, lesson) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("adminToken");
      let result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/result/exercise/?user=${userID}&lesson=${lesson}&type=exercise`,
       
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      const { data } = result;
      dispatch({
        type: userConstant.GET_EXERCISE_RESULT_SUCCESS,
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
          type: userConstant.GET_EXERCISE_RESULT_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const addMessage = (body) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.ADD_MESSAGE_REQUEST,
    });
    try {
      await sendMessage(body);
      dispatch({
        type: userConstant.ADD_MESSAGE_SUCCESS,
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
          type: userConstant.ADD_MESSAGE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const LogoutUser = (body) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.LOGOUT_USER_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.post(`${process.env.REACT_APP_ROOT}/api/auth/logout`, body, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      dispatch({
        type: userConstant.LOGOUT_USER_SUCCESS,
        payload: "User has been logout",
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
          type: userConstant.LOGOUT_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UpdateLevelOfUser = (body, userId) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.UPDATE_USER_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/api/auth/users/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: userConstant.UPDATE_USER_SUCCESS,
        payload: "User has been updated",
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
          type: userConstant.UPDATE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
export const DeleteSingleUser = (userId) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.DELETE_SINGLE_USER_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `${process.env.REACT_APP_ROOT}/api/auth/users/${userId}`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: userConstant.DELETE_SINGLE_USER_SUCCESS,
        payload: "User has been deleted",
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
          type: userConstant.DELETE_SINGLE_USER_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};

export const UploadCertificationOfUser = (body, userId) => {
  return async (dispatch) => {
    dispatch({
      type: userConstant.UPLOAD_CERTIFICATE_REQUEST,
    });
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(
        `${process.env.REACT_APP_ROOT}/api/auth/certificate/${userId}`,
        body,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
      dispatch({
        type: userConstant.UPLOAD_CERTIFICATE_SUCCESS,
        payload: "Certification has been created",
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
          type: userConstant.UPLOAD_CERTIFICATE_FAILURE,
          payload: { err: error.response.data.message },
        });
      }
    }
  };
};
