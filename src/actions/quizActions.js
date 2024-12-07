import axios from "axios";
import { toast } from "react-toastify";
import { apiBaseUrl } from "../appConfig";

export const OPEN_QUIZ_MODAL = "OPEN_MODAL";
export const CLOSE_QUIZ_MODAL = "CLOSE_MODAL";
export const GENERATE_QUESTION_FAILURE = "GENERATE_QUESTION_FAILURE";
export const SET_QUESTIONS = "SET_QUESTIONS";

export const openQuizModal = () => ({ type: OPEN_QUIZ_MODAL });
export const closeQuizModal = () => ({ type: CLOSE_QUIZ_MODAL });
export const setQuestions = (questions) => ({
  type: SET_QUESTIONS,
  payload: questions,
});

const fetchQuiz = async (note, userInfo) => {
  const requestParams = { id: note.id, content: note.content };
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userInfo.token}`,
    },
  };

  const response = await axios.post(
    `${apiBaseUrl}/api/learning_notes/generate_questions/`,
    requestParams,
    config
  );

  return response.data;
};

export const generateQuizForNote = (note, userInfo) => async (dispatch) => {
  try {
    const responseData = await fetchQuiz(note, userInfo);
    dispatch(setQuestions(responseData.questions));
  } catch (error) {
    let errorMessage = "Error occurred while generating quiz";
    toast.error(errorMessage);

    if (error.response && error.response.data) {
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.message) {
      errorMessage = error.message;
    };

    console.log(errorMessage);

    dispatch({ type: GENERATE_QUESTION_FAILURE, payload: error });
  }
};
