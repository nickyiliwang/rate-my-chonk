import { SET_AUTHENTICATED, SET_UNAUTHENTICATED,  } from "../types";

export const setAuthenticated = token => dispatch => {
  dispatch({ type: SET_AUTHENTICATED, payload: token });
};

export const setUnAuthenticated = () => dispatch => {
  dispatch({ type: SET_UNAUTHENTICATED });
  localStorage.clear();
};