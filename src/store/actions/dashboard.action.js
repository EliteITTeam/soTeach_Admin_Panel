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
