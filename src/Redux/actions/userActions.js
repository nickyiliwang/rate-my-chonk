import { SET_AUTHENTICATED, SET_UNAUTHENTICATED,  } from "../types";

export const setAuthenticated = credentials => dispatch => {
  dispatch({ type: SET_AUTHENTICATED, payload: credentials });
};

export const setUnAuthenticated = () => dispatch => {
  dispatch({ type: SET_UNAUTHENTICATED });
  localStorage.clear();
};