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
  MOVE_TO_COLLECTION_SUCCESS,
  MOVE_TO_COLLECTION_FAILURE,
  REMOVE_NOTE_FROM_LIST,
  CLEAR_LEARNING_NOTES,
  SEARCH_LEARNING_NOTE_REQUEST,
  SEARCH_LEARNING_NOTE_SUCCESS,
  SEARCH_LEARNING_NOTE_FAILURE,
  CLEAR_SEARCHED_NOTES,
} from "../actions/learningNoteActions";
import { LOGOUT, REGISTER_SUCCESS } from "../actions/userActions";

const initialState = {
  notes: [],
  currentPage: 1,
  loading: false,
  error: null,
};

const learningNoteReducer = (state = initialState, action) => {
  let noteList;
  let updatedList;

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
      const { next_page, previous_page, count, current_page, total_pages, results } = action.payload;
      updatedList = [ ...state.notes, ...results];
      return {
        ...state,
        notes: updatedList,
        nextPage: next_page,
        previousPage: previous_page,
        totalCount: count,
        currentPage: current_page,
        totalPages: total_pages,
        loading: false,
      };

    case CREATE_LEARNING_NOTE_SUCCESS:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
        loading: false,
      };

    case ARCHIVE_LEARNING_NOTE_SUCCESS:
    case DELETE_LEARNING_NOTE_SUCCESS:
      noteList = state.notes.filter(function (note) {
        return note.id !== action.noteId;
      });

      return {
        ...state,
        notes: noteList,
        loading: false,
      };

    case UPDATE_LEARNING_NOTE_SUCCESS:
      const updatedLearningNote = action.payload;
      updatedList = state.notes.map((note) =>
        note.id === updatedLearningNote.id ? updatedLearningNote : note
      );

      return {
        ...state,
        notes: updatedList,
        loading: false,
      };

    case SEARCH_LEARNING_NOTE_REQUEST:
      return {
        ...state,
        searching: true,
      };

    case SEARCH_LEARNING_NOTE_SUCCESS:
      return {
        ...state,
        loading: false,
        searchedNotes: action.payload,
      };

    case FETCH_LEARNING_NOTES_FAILURE:
    case CREATE_LEARNING_NOTE_FAILURE:
    case ARCHIVE_LEARNING_NOTE_FAILURE:
    case DELETE_LEARNING_NOTE_FAILURE:
    case UPDATE_LEARNING_NOTE_FAILURE:
    case MOVE_TO_COLLECTION_FAILURE:
    case SEARCH_LEARNING_NOTE_FAILURE:
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
      noteList = state.notes;
      updatedList = noteList.map((note) =>
        note.id === action.payload.noteId
          ? { ...note, labels: [...note.labels, action.payload.labelId] }
          : note
      );
      return {
        ...state,
        notes: updatedList,
      };

    case REMOVE_LABEL_FROM_NOTE_SUCCESS:
      noteList = state.notes;
      updatedList = noteList.map((note) =>
        note.id === action.payload.noteId
          ? {
              ...note,
              labels: note.labels.filter(
                (labelId) => labelId !== action.payload.labelId
              ),
            }
          : note
      );
      return {
        ...state,
        notes: updatedList,
      };

    case REMOVE_NOTE_FROM_LIST:
      updatedList = state.notes.filter((note) => note.id !== action.payload);
      return {
        ...state,
        notes: updatedList,
      };

    case MOVE_TO_COLLECTION_SUCCESS:
      updatedList = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      return {
        ...state,
        notes: updatedList,
      };

    case CLEAR_LEARNING_NOTES:
      return {
        ...state,
        notes: [],
        currentPage: 1,
        nextPage: null,
        totalPages: null,
        totalCount: null,
      };

    case CLEAR_SEARCHED_NOTES:
      return {
        ...state,
        searchedNotes: [],
        searching: false,
      };

    default:
      return state;
  }
};

export default learningNoteReducer;
