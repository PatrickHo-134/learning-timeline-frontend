import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../appConfig";

export const CLEAR_LEARNING_NOTES = "CLEAR_LEARNING_NOTES";

//// FETCH LEARNING NOTES

export const FETCH_LEARNING_NOTES_REQUEST = "FETCH_LEARNING_NOTES_REQUEST";
export const FETCH_LEARNING_NOTES_SUCCESS = "FETCH_LEARNING_NOTES_SUCCESS";
export const FETCH_LEARNING_NOTES_FAILURE = "FETCH_LEARNING_NOTES_FAILURE";

export const fetchLearningNotesRequest = () => ({
  type: FETCH_LEARNING_NOTES_REQUEST,
});

export const fetchLearningNotesSuccess = (learningNotes) => ({
  type: FETCH_LEARNING_NOTES_SUCCESS,
  payload: learningNotes,
});

export const fetchLearningNotesFailure = (error) => ({
  type: FETCH_LEARNING_NOTES_FAILURE,
  payload: error,
});

export const clearLearningNotes = () => ({
  type: CLEAR_LEARNING_NOTES,
});

export const fetchLearningNotes = (pageNumber = 1) => {
  return (dispatch, getState) => {
    const {
      userLogin: { userInfo },
      pageFilter: { selectedCategory, selectedLabels },
    } = getState();

    if (!userInfo || !userInfo.token) {
      const errorMessage = "User authentication is missing. Please log in.";
      dispatch(fetchLearningNotesFailure(errorMessage));
      toast.error(errorMessage);
      return;
    }

    if (pageNumber === 1) {
      dispatch(clearLearningNotes());
    }

    const config = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
      params: {
        collection_id: selectedCategory,
        labels: selectedLabels,
        page: pageNumber,
      },
    };

    dispatch(fetchLearningNotesRequest());

    axios
      .get(`${apiBaseUrl}/api/timeline/${userInfo.id}/`, config)
      .then((response) => {
        const learningNotes = response.data;
        dispatch(fetchLearningNotesSuccess(learningNotes));
      })
      .catch((error) => {
        const errorMessage =
          error?.response?.data?.error ||
          "Error occurred while loading learning notes";
        dispatch(fetchLearningNotesFailure(errorMessage));
        toast.error(errorMessage);
      });
  };
};

//// CREATE LEARNING NOTES

export const CREATE_LEARNING_NOTE_REQUEST = "CREATE_LEARNING_NOTE_REQUEST";
export const CREATE_LEARNING_NOTE_SUCCESS = "CREATE_LEARNING_NOTE_SUCCESS";
export const CREATE_LEARNING_NOTE_FAILURE = "CREATE_LEARNING_NOTE_FAILURE";

export const createLearningNoteRequest = () => ({
  type: CREATE_LEARNING_NOTE_REQUEST,
});

export const createLearningNoteSuccess = (newLearningNote) => ({
  type: CREATE_LEARNING_NOTE_SUCCESS,
  payload: newLearningNote,
});

export const createLearningNoteFailure = (error) => ({
  type: CREATE_LEARNING_NOTE_FAILURE,
  payload: error,
});

export const createLearningNote = (newLearningNote, userInfo) => {
  const { id, token } = userInfo;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return (dispatch) => {
    dispatch(createLearningNoteRequest());
    axios
      .post(`${apiBaseUrl}/api/learning_notes/create/${id}/`, newLearningNote, {
        headers: headers,
      })
      .then((response) => {
        const createdLearningNote = response.data;
        dispatch(createLearningNoteSuccess(createdLearningNote));
        toast.success("Note added successfully");
      })
      .catch((response) => {
        const errorMessage =
          response?.response?.data?.error ||
          "Failed to create new note. Please try again.";
        dispatch(createLearningNoteFailure(errorMessage));
        toast.error(errorMessage);
      });
  };
};

//// ARCHIVE LEARNING NOTES

export const ARCHIVE_LEARNING_NOTE_REQUEST = "ARCHIVE_LEARNING_NOTE_REQUEST";
export const ARCHIVE_LEARNING_NOTE_SUCCESS = "ARCHIVE_LEARNING_NOTE_SUCCESS";
export const ARCHIVE_LEARNING_NOTE_FAILURE = "ARCHIVE_LEARNING_NOTE_FAILURE";

export const archiveLearningNoteRequest = () => {
  return { type: ARCHIVE_LEARNING_NOTE_REQUEST };
};

export const archiveLearningNoteSuccess = (id) => {
  return { type: ARCHIVE_LEARNING_NOTE_SUCCESS, noteId: id };
};

export const archiveLearningNoteFailure = (error) => {
  return { type: ARCHIVE_LEARNING_NOTE_FAILURE, payload: error };
};

export const archiveLearningNote = (noteId, userInfo) => {
  const { token } = userInfo;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return (dispatch) => {
    dispatch(archiveLearningNoteRequest());

    axios
      .post(`${apiBaseUrl}/api/learning_notes/${noteId}/archive/`, null, {
        headers: headers,
      })
      .then((response) => {
        dispatch(archiveLearningNoteSuccess(noteId));
        toast.success("Note archived successfully");
      })
      .catch((response) => {
        const errorMessage =
          response?.response?.data?.error ||
          "Failed to archive learning note. Please try again.";
        dispatch(archiveLearningNoteFailure(errorMessage));
        toast.error(errorMessage);
      });
  };
};

//// DELETE LEARNING NOTES

export const DELETE_LEARNING_NOTE_REQUEST = "DELETE_LEARNING_NOTE_REQUEST";
export const DELETE_LEARNING_NOTE_SUCCESS = "DELETE_LEARNING_NOTE_SUCCESS";
export const DELETE_LEARNING_NOTE_FAILURE = "DELETE_LEARNING_NOTE_FAILURE";

export const deleteLearningNoteRequest = () => {
  return { type: DELETE_LEARNING_NOTE_REQUEST };
};

export const deleteLearningNoteSuccess = (id) => {
  return { type: DELETE_LEARNING_NOTE_SUCCESS, noteId: id };
};

export const deleteLearningNoteFailure = (error) => {
  return { type: DELETE_LEARNING_NOTE_FAILURE, payload: error };
};

export const deleteLearningNote = (noteId, userInfo) => {
  const { token } = userInfo;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return (dispatch) => {
    dispatch(deleteLearningNoteRequest());

    axios
      .delete(`${apiBaseUrl}/api/learning_notes/${noteId}/delete/`, {
        headers: headers,
      })
      .then((response) => {
        dispatch(deleteLearningNoteSuccess(noteId));
        toast.success("Note deleted successfully");
      })
      .catch((response) => {
        const errorMessage =
          response?.response?.data?.error ||
          "Failed to delete learning note. Please try again.";
        dispatch(deleteLearningNoteFailure(errorMessage));
        toast.error(errorMessage);
      });
  };
};

//// UPDATE LEARNING NOTES

export const UPDATE_LEARNING_NOTE_REQUEST = "UPDATE_LEARNING_NOTE_REQUEST";
export const UPDATE_LEARNING_NOTE_SUCCESS = "UPDATE_LEARNING_NOTE_SUCCESS";
export const UPDATE_LEARNING_NOTE_FAILURE = "UPDATE_LEARNING_NOTE_FAILURE";

export const updateLearningNoteRequest = () => ({
  type: UPDATE_LEARNING_NOTE_REQUEST,
});

export const updateLearningNoteSuccess = (newLearningNote) => ({
  type: UPDATE_LEARNING_NOTE_SUCCESS,
  payload: newLearningNote,
});

export const updateLearningNoteFailure = (error) => ({
  type: UPDATE_LEARNING_NOTE_FAILURE,
  payload: error,
});

export const updateLearningNote = (noteId, data, userInfo) => {
  const { token } = userInfo;
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  return (dispatch) => {
    dispatch(updateLearningNoteRequest());
    axios
      .patch(`${apiBaseUrl}/api/learning_notes/update/${noteId}/`, data, {
        headers: headers,
      })
      .then((response) => {
        const updatedLearningNote = response.data;
        dispatch(updateLearningNoteSuccess(updatedLearningNote));
        toast.success("Note updated successfully!");
      })
      .catch((response) => {
        const errorMessage =
          response?.response?.data?.error || "Failed to update note";
        dispatch(updateLearningNoteFailure(errorMessage));
        toast.error(errorMessage);
      });
  };
};

//// ADD LABEL TO LEARNING NOTE

export const ADD_LABEL_TO_NOTE_SUCCESS = "ADD_LABEL_TO_NOTE_SUCCESS";

export const addLabelToLearningNote =
  (noteId, labelId) => async (dispatch, getState) => {
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

      await axios.put(
        `${apiBaseUrl}/api/learning-notes/${noteId}/add-label/`,
        { labelId },
        config
      );

      dispatch({
        type: ADD_LABEL_TO_NOTE_SUCCESS,
        payload: { labelId: labelId, noteId: noteId },
      });
    } catch (response) {
      const errorMessage =
        response?.response?.data?.error || "Failed to add label to note";
      toast.error(errorMessage);
    }
  };

//// REMOVE LABEL TO LEARNING NOTE

export const REMOVE_LABEL_FROM_NOTE_SUCCESS = "REMOVE_LABEL_FROM_NOTE_SUCCESS";
export const removeLabelFromLearningNote =
  (noteId, labelId) => async (dispatch, getState) => {
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

      await axios.put(
        `${apiBaseUrl}/api/learning-notes/${noteId}/remove-label/`,
        { labelId },
        config
      );

      dispatch({
        type: REMOVE_LABEL_FROM_NOTE_SUCCESS,
        payload: { labelId: labelId, noteId: noteId },
      });
    } catch (response) {
      const errorMessage =
        response?.response?.data?.error || "Failed to remove label from note";
      toast.error(errorMessage);
    }
  };

//// ADD LEARNING NOTE TO CATEGORY

export const MOVE_TO_COLLECTION_SUCCESS = "MOVE_TO_COLLECTION_SUCCESS";
export const MOVE_TO_COLLECTION_FAILURE = "MOVE_TO_COLLECTION_FAILURE";
export const REMOVE_NOTE_FROM_LIST = "REMOVE_NOTE_FROM_LIST";

export const moveNoteToCollection =
  (noteInfo, collectionId) => async (dispatch, getState) => {
    try {
      const {
        userLogin: { userInfo },
      } = getState();
      const {
        pageFilter: { selectedCategory },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      await axios.put(
        `${apiBaseUrl}/api/learning_notes/${noteInfo.id}/add_to_collection/`,
        { collectionId: collectionId },
        config
      );

      if (selectedCategory !== 0 && selectedCategory !== collectionId) {
        dispatch({
          type: REMOVE_NOTE_FROM_LIST,
          payload: noteInfo.id,
        });
      } else {
        const updatedNote = { ...noteInfo, collection: collectionId };
        dispatch({
          type: MOVE_TO_COLLECTION_SUCCESS,
          payload: updatedNote,
        });
      }

      toast.success("Add note to category successfully");
    } catch (error) {
      dispatch({
        type: MOVE_TO_COLLECTION_FAILURE,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
      toast.error("Failed to add note to category");
    }
  };
