import {
  SET_AUTHENTICATED,
} from "../types";

export const setAuthenticated = () => dispatch => {
  dispatch({ type: SET_AUTHENTICATED });
};
