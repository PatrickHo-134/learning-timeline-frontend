import {
  SET_SELECTED_CATEGORY,
  SET_SELECTED_LABELS,
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

    default:
      return state;
  }
};
