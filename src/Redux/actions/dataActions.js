import { SET_CHONKS, SET_FAV, REMOVE_CHONKS } from "../types";

export const addCatsToStore = catsArr => dispatch => {
  dispatch({ type: SET_CHONKS, payload: catsArr });
};

export const removeAllCats = () => dispatch => {
  dispatch({ type: REMOVE_CHONKS });
};

export const addUserFav = catsArr => dispatch => {
  dispatch({ type: SET_FAV, payload: catsArr });
};
