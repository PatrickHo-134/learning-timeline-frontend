export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_SELECTED_LABELS = "SET_SELECTED_LABELS";
export const ADD_LABEL_FILTER = "ADD_LABEL_FILTER";
export const REMOVE_LABEL_FILTER = "REMOVE_LABEL_FILTER";

export const setCategoryFilter = (categoryId) => ({
  type: SET_SELECTED_CATEGORY,
  payload: categoryId,
});

export const setLabelsFilter = (labels) => ({
  type: SET_SELECTED_LABELS,
  payload: labels,
});

export const addLabelFilter = (labelId) => (dispatch) => {
  dispatch({
    type: ADD_LABEL_FILTER,
    payload: labelId,
  });
};

export const removeLabelFilter = (labelId) => (dispatch) => {
  dispatch({
    type: REMOVE_LABEL_FILTER,
    payload: labelId,
  });
};