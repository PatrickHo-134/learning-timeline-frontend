export const SET_SELECTED_CATEGORY = "SET_SELECTED_CATEGORY";
export const SET_SELECTED_LABELS = "SET_SELECTED_LABELS";

export const setCategoryFilter = (categoryId) => ({
  type: SET_SELECTED_CATEGORY,
  payload: categoryId,
});

export const setLabelsFilter = (labels) => ({
  type: SET_SELECTED_LABELS,
  payload: labels,
});
