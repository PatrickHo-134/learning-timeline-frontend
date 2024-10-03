import axios from "axios";
import { apiBaseUrl } from "../appConfig";
import { toast } from "react-toastify";

export const LABELS_FETCH_REQUEST = "LABELS_FETCH_REQUEST";
export const LABELS_FETCH_SUCCESS = "LABELS_FETCH_SUCCESS";
export const LABELS_FETCH_FAIL = "LABELS_FETCH_FAIL";

export const LABEL_CREATE_REQUEST = "LABEL_CREATE_REQUEST";
export const LABEL_CREATE_SUCCESS = "LABEL_CREATE_SUCCESS";
export const LABEL_CREATE_FAILURE = "LABEL_CREATE_FAILURE";

export const LABEL_DELETE_SUSSCESS = "LABEL_DELETE_SUSSCESS";
export const LABEL_DELETE_FAILURE = "LABEL_DELETE_FAILURE";

export const RESET_LABELS = "RESET_LABELS";

export const fetchLabels = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: LABELS_FETCH_REQUEST });

    const { data } = await axios.get(`${apiBaseUrl}/api/labels/${userInfo.id}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: LABELS_FETCH_SUCCESS, payload: data });
  } catch (response) {
    dispatch({
      type: LABELS_FETCH_FAIL,
      payload:
      response.response && response.response.data.detail
          ? response.response.data.detail
          : response.message,
    });
  }
};

const createLabelRequest = () => ({
  type: LABEL_CREATE_REQUEST,
});

export const createLabel = (labelData, userInfo) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    dispatch(createLabelRequest());

    const { data } = await axios.post(
      `${apiBaseUrl}/api/labels/create/`,
      labelData,
      config
    );

    dispatch({
      type: LABEL_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LABEL_CREATE_FAILURE,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteLabel = (labelId) => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`${apiBaseUrl}/api/labels/delete-label/${labelId}/`, config);

    dispatch({
      type: LABEL_DELETE_SUSSCESS,
      payload: { labelId: labelId },
    });
  } catch (error) {
    dispatch({
      type: LABEL_DELETE_FAILURE,
      payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
    });
    toast.error("Failed to delete label");
  }
};
