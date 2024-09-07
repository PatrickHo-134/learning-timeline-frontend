import axios from "axios";

//// FETCH LEARNING NOTES
// Action Types
export const FETCH_LEARNING_NOTES_REQUEST = "FETCH_LEARNING_NOTES_REQUEST";
export const FETCH_LEARNING_NOTES_SUCCESS = "FETCH_LEARNING_NOTES_SUCCESS";
export const FETCH_LEARNING_NOTES_FAILURE = "FETCH_LEARNING_NOTES_FAILURE";

// Action Creators
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

export const fetchLearningNotes = (userInfo) => {
  return (dispatch) => {
    dispatch(fetchLearningNotesRequest());
    axios
      .get(`/api/timeline/${userInfo.id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      })
      .then((response) => {
        const learningNotes = response.data;
        dispatch(fetchLearningNotesSuccess(learningNotes));
      })
      .catch((error) => {
        dispatch(fetchLearningNotesFailure(error.message));
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
      .post(`/api/learning_notes/create/${id}/`, newLearningNote, {
        headers: headers,
      })
      .then((response) => {
        const createdLearningNote = response.data;
        dispatch(createLearningNoteSuccess(createdLearningNote));
      })
      .catch((error) => {
        dispatch(createLearningNoteFailure(error.message));
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
      .post(`/api/learning_notes/${noteId}/archive/`, null, {
        headers: headers,
      })
      .then((response) => {
        dispatch(archiveLearningNoteSuccess(noteId));
      })
      .catch((error) => {
        dispatch(
          archiveLearningNoteFailure(
            "Failed to archive learning note. Please try again."
          )
        );
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
      .delete(`/api/learning_notes/${noteId}/delete/`, {
        headers: headers,
      })
      .then((response) => {
        dispatch(deleteLearningNoteSuccess(noteId));
      })
      .catch((error) => {
        dispatch(
          deleteLearningNoteFailure(
            "Failed to delete learning note. Please try again."
          )
        );
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
      .patch(`/api/learning_notes/update/${noteId}/`, data, {
        headers: headers,
      })
      .then((response) => {
        const updatedLearningNote = response.data;
        dispatch(updateLearningNoteSuccess(updatedLearningNote));
      })
      .catch((error) => {
        dispatch(
          updateLearningNoteFailure(
            "Failed to update learning note. Please try again."
          )
        );
      });
  };
};

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
        `/api/learning-notes/${noteId}/add-label/`,
        { labelId },
        config
      );

      dispatch({
        type: ADD_LABEL_TO_NOTE_SUCCESS,
        payload: { labelId: labelId, noteId: noteId },
      });
    } catch (error) {
      // handle error appropriately
    }
  };

export const REMOVE_LABEL_FROM_NOTE_SUCCESS = "REMOVE_LABEL_FROM_NOTE_SUCCESS";
export const removeLabelFromLearningNote = (noteId, labelId) =>
async (dispatch, getState) => {
  const { userLogin: { userInfo },} = getState();

  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.put(
      `/api/learning-notes/${noteId}/remove-label/`,
      { labelId },
      config

    );

    dispatch({
      type: REMOVE_LABEL_FROM_NOTE_SUCCESS,
      payload: { labelId: labelId, noteId: noteId },
    });
  } catch (error) {
    // TODO: handle error here
  }
}