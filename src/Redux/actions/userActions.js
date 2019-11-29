import { SET_AUTHENTICATED, SET_UNAUTHENTICATED, FAV_CAT } from "../types";

export const setAuthenticated = token => dispatch => {
  dispatch({ type: SET_AUTHENTICATED, payload: token });
};

export const setUnAuthenticated = () => dispatch => {
  dispatch({ type: SET_UNAUTHENTICATED });
};

export const favoriteACat = (catHandle, userId) => dispatch => {







  dispatch({ type: FAV_CAT, payload: catHandle });
};
