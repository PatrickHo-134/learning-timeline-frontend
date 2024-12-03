import { OPEN_QUIZ_MODAL, CLOSE_QUIZ_MODAL, SET_QUESTIONS } from "../actions/quizActions";

const initialState = {
  isModalOpen: false,
  loading: false,
  questions: [],
};

export default function QuizModalReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_QUIZ_MODAL:
      return { ...state, isModalOpen: true, loading: true };
    case CLOSE_QUIZ_MODAL:
      return { ...state, isModalOpen: false, loading: false };
    case SET_QUESTIONS:
      return { ...state, questions: action.payload, loading: false };
    default:
      return state;
  }
}