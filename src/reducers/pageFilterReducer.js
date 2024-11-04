import {
  SET_SELECTED_CATEGORY,
  SET_SELECTED_LABELS,
  ADD_LABEL_FILTER,
  REMOVE_LABEL_FILTER,
} from "../actions/pageFilterActions";

const initialState = { selectedCategory: 0, selectedLabels: [] };

export const pageFilterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case SET_SELECTED_LABELS:
      return {
        ...state,
        selectedLabels: action.payload,
      };
    case ADD_LABEL_FILTER:
      return {
        ...state,
        selectedLabels: [...state.selectedLabels, action.payload],
      };
    case REMOVE_LABEL_FILTER:
      return {
        ...state,
        selectedLabels: state.selectedLabels.filter(
          (id) => id !== action.payload
        ),
      };

    default:
      return state;
  }
};
