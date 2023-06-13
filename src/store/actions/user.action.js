import { userConstant, assessmentConstant } from "./../constants";
import axios from "axios";
import { sendMessage } from "./../../firebase";

export const GetAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: userConstant.GET_ALL_USER_REQUEST });
    try {
      const token = localStorage.getItem("adminToken");
      const result = await axios.get(
        `${process.env.REACT_APP_ROOT}/api/auth?isVerified=true`,
        {
          headers: {
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );
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
