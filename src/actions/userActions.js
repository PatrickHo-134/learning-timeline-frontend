import axios from "axios";
import { apiBaseUrl } from "../appConfig";
import { RESET_COLLECTIONS } from "./collectionActions";
import { RESET_LABELS } from "./labelActions";
import { CLEAR_LEARNING_NOTES } from "./learningNoteActions";
import { startLoading, stopLoading } from "./pageControlActions";

// user login

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const loginRequest = () => {
  return { type: LOGIN_REQUEST };
};

export const loginSuccess = (responseData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: responseData,
  };
};

export const loginFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
};

// Asynchronous action to handle user login
export const login = (email, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/login/`,
        { username: email, password: password }
      );

      dispatch(loginSuccess(response.data));
      dispatch(startLoading());
      localStorage.setItem("userInfo", JSON.stringify(response.data));
    } catch (error) {
      dispatch(loginFailure("Login failed. Please try again."));
      dispatch(stopLoading());
    }
  };
};


// user logout

export const LOGOUT = "LOGOUT";

export const logout = (dispatch) => {
  localStorage.removeItem("userInfo");

  dispatch({ type: LOGOUT });

  dispatch({ type: CLEAR_LEARNING_NOTES });
  dispatch({ type: RESET_LABELS });
  dispatch({ type: RESET_COLLECTIONS });
};


// user register

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (firstName, lastName, email, password) => {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    dispatch(startLoading());

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/users/register/`,
        { 'first_name': firstName, 'last_name': lastName, 'email': email, 'password': password }
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: response.data,
      });

      dispatch(loginSuccess(response.data));
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      dispatch(stopLoading());
    } catch (error) {
      dispatch(stopLoading());
      dispatch({
        type: REGISTER_FAILURE,
        payload: error,
      });
    }
  };
};