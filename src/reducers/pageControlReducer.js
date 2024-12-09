import { START_LOADING, STOP_LOADING } from "../actions/pageControlActions";

const initialState = {
  loading: false,
};

export default function pageControlReducer(state = initialState, action) {
  switch (action.type) {
    case START_LOADING:
      return { isLoading: true };
    case STOP_LOADING:
      return { isloading: false };
    default:
      return state;
  }
}
