import {
  FETCH_LEARNING_NOTES_REQUEST,
  FETCH_LEARNING_NOTES_SUCCESS,
  FETCH_LEARNING_NOTES_FAILURE,
  CREATE_LEARNING_NOTE_REQUEST,
  CREATE_LEARNING_NOTE_SUCCESS,
  CREATE_LEARNING_NOTE_FAILURE,
  ARCHIVE_LEARNING_NOTE_REQUEST,
  ARCHIVE_LEARNING_NOTE_SUCCESS,
  ARCHIVE_LEARNING_NOTE_FAILURE,
  DELETE_LEARNING_NOTE_REQUEST,
  DELETE_LEARNING_NOTE_SUCCESS,
  DELETE_LEARNING_NOTE_FAILURE,
  UPDATE_LEARNING_NOTE_REQUEST,
  UPDATE_LEARNING_NOTE_SUCCESS,
  UPDATE_LEARNING_NOTE_FAILURE,
  ADD_LABEL_TO_NOTE_SUCCESS,
  REMOVE_LABEL_FROM_NOTE_SUCCESS,
} from "../actions/learningNoteActions";
import { LOGOUT, REGISTER_SUCCESS } from "../actions/userActions";

const initialState = {
  learningNotes: [],
  loading: false,
  error: null,
};

const learningNoteReducer = (state = initialState, action) => {
  let noteList;

  switch (action.type) {
    case FETCH_LEARNING_NOTES_REQUEST:
    case CREATE_LEARNING_NOTE_REQUEST:
    case ARCHIVE_LEARNING_NOTE_REQUEST:
    case DELETE_LEARNING_NOTE_REQUEST:
    case UPDATE_LEARNING_NOTE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LEARNING_NOTES_SUCCESS:
      return {
        ...state,
        learningNotes: action.payload,
        loading: false,
      };

    case CREATE_LEARNING_NOTE_SUCCESS:
      return {
        ...state,
        learningNotes: [action.payload, ...state.learningNotes],
        loading: false,
      };

    case ARCHIVE_LEARNING_NOTE_SUCCESS:
    case DELETE_LEARNING_NOTE_SUCCESS:
      noteList = state.learningNotes.filter(function (note) {
        return note.id !== action.noteId;
      });

      return {
        ...state,
        learningNotes: noteList,
        loading: false,
      };

    case UPDATE_LEARNING_NOTE_SUCCESS:
      const updatedLearningNote = action.payload;
      noteList = state.learningNotes.map((note) =>
        note.id === updatedLearningNote.id ? updatedLearningNote : note
      );

      return {
        ...state,
        learningNotes: noteList,
        loading: false,
      };

    case FETCH_LEARNING_NOTES_FAILURE:
    case CREATE_LEARNING_NOTE_FAILURE:
    case ARCHIVE_LEARNING_NOTE_FAILURE:
    case DELETE_LEARNING_NOTE_FAILURE:
    case UPDATE_LEARNING_NOTE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case LOGOUT:
    case REGISTER_SUCCESS:
      return {
        ...state,
      };

    case ADD_LABEL_TO_NOTE_SUCCESS:
      return {
        ...state,
        learningNotes: state.learningNotes.map((note) =>
          note.id === action.payload.noteId
            ? { ...note, labels: [...note.labels, action.payload.labelId] }
            : note
        ),
      };

    case REMOVE_LABEL_FROM_NOTE_SUCCESS:
      return {
        ...state,
        learningNotes: state.learningNotes.map((note) =>
          note.id === action.payload.noteId
            ? {
                ...note,
                labels: note.labels.filter(
                  (labelId) => labelId !== action.payload.labelId
                ),
              }
            : note
        ),
      };

    default:
      return state;
  }
};

export default learningNoteReducer;
