import { SET_CHONKS,SET_FAV } from "../types";

export const addCatsToStore = catsArr => dispatch => {
  dispatch({ type: SET_CHONKS, payload: catsArr });
};

export const addUserFav = catsArr => dispatch => {
  dispatch({ type: SET_FAV, payload: catsArr });
};

