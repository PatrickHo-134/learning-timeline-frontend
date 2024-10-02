import {
  COLLECTIONS_FETCH_REQUEST,
  COLLECTIONS_FETCH_SUCCESS,
  COLLECTIONS_FETCH_FAIL,
  COLLECTION_CREATE_SUCCESS,
  COLLECTION_CREATE_FAILURE,
  COLLECTION_ARCHIVE_SUCCESS,
  COLLECTION_ARCHIVE_FAILURE,
  RESET_COLLECTIONS,
} from "../actions/collectionActions";

const defaultCategory = { id: 0, name: "All notes" };

const initialState = {
  collections: [],
  loading: false,
  error: null,
};

export const collectionListReducer = (state = initialState, action) => {
  switch (action.type) {
    case COLLECTIONS_FETCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COLLECTIONS_FETCH_SUCCESS:
      return {
        collections: [defaultCategory, ...action.payload],
        loading: false,
      };
    case COLLECTIONS_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COLLECTION_CREATE_SUCCESS:
      return {
        ...state,
        collections: [...state.collections, action.payload],
        loading: false,
      };
    case COLLECTION_CREATE_FAILURE:
    case COLLECTION_ARCHIVE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case COLLECTION_ARCHIVE_SUCCESS:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection.id !== action.payload.collectionId
        ),
      };
    case RESET_COLLECTIONS:
      return {
        collections: [],
      };
    default:
      return state;
  }
};
