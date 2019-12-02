import { SET_CHONKS } from "../types";

export const addCatsToStore = catsArr => dispatch => {
  dispatch({ type: SET_CHONKS, payload: catsArr });
};
