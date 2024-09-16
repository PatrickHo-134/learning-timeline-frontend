import axios from "axios";
import { apiBaseUrl } from "../appConfig";
import { toast } from "react-toastify";

export const COLLECTIONS_FETCH_REQUEST = "COLLECTIONS_FETCH_REQUEST";
export const COLLECTIONS_FETCH_SUCCESS = "COLLECTIONS_FETCH_SUCCESS";
export const COLLECTIONS_FETCH_FAIL = "COLLECTIONS_FETCH_FAIL";

export const COLLECTION_CREATE_REQUEST = "COLLECTION_CREATE_REQUEST";
export const COLLECTION_CREATE_SUCCESS = "COLLECTION_CREATE_SUCCESS";
export const COLLECTION_CREATE_FAILURE = "COLLECTION_CREATE_FAILURE";

export const COLLECTION_DELETE_SUSSCESS = "COLLECTION_DELETE_SUSSCESS";
export const COLLECTION_DELETE_FAILURE = "COLLECTION_DELETE_FAILURE";

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

const createCollectionRequest = () => ({
  type: COLLECTION_CREATE_REQUEST,
});

export const createCollection =
  (collectionData, userInfo) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      dispatch(createCollectionRequest());

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
