import axios from "axios";
import { apiBaseUrl } from "../appConfig";
import { toast } from "react-toastify";

export const COLLECTIONS_FETCH_REQUEST = "COLLECTIONS_FETCH_REQUEST";
export const COLLECTIONS_FETCH_SUCCESS = "COLLECTIONS_FETCH_SUCCESS";
export const COLLECTIONS_FETCH_FAIL = "COLLECTIONS_FETCH_FAIL";

export const COLLECTION_CREATE_REQUEST = "COLLECTION_CREATE_REQUEST";
export const COLLECTION_CREATE_SUCCESS = "COLLECTION_CREATE_SUCCESS";
export const COLLECTION_CREATE_FAILURE = "COLLECTION_CREATE_FAILURE";

export const COLLECTION_ARCHIVE_SUCCESS = "COLLECTION_ARCHIVE_SUCCESS";
export const COLLECTION_ARCHIVE_FAILURE = "COLLECTION_ARCHIVE_FAILURE";

export const RESET_COLLECTIONS = "RESET_COLLECTIONS";

export const fetchCollections = (userInfo) => async (dispatch) => {
  try {
    dispatch({ type: COLLECTIONS_FETCH_REQUEST });

    const { data } = await axios.get(
      `${apiBaseUrl}/api/collection/list/${userInfo.id}/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: COLLECTIONS_FETCH_SUCCESS, payload: data });
  } catch (response) {
    dispatch({
      type: COLLECTIONS_FETCH_FAIL,
      payload:
        response.response && response.response.data.detail
          ? response.response.data.detail
          : response.message,
    });
    toast.error("Failed to load categories");
  }
};

export const createCollection =
  (collectionData, userInfo) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${apiBaseUrl}/api/collection/create/`,
        collectionData,
        config
      );

      dispatch({
        type: COLLECTION_CREATE_SUCCESS,
        payload: data,
      });
      toast.success("New collection created successfully");
    } catch (error) {
      dispatch({
        type: COLLECTION_CREATE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      toast.error("Failed to create new category");
    }
  };

export const archiveCollection =
  (collectionId) => async (dispatch, getState) => {
    const {
      userLogin: { userInfo },
    } = getState();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.post(
        `${apiBaseUrl}/api/collection/${collectionId}/archive/`,
        {},
        config
      );

      dispatch({
        type: COLLECTION_ARCHIVE_SUCCESS,
        payload: { collectionId: collectionId },
      });
    } catch (error) {
      dispatch({
        type: COLLECTION_ARCHIVE_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      toast.error("Failed to archive category");
    }
  };
