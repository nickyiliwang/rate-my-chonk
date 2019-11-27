import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
} from "../types";

export const setAuthenticated = () => dispatch => {
  dispatch({ type: SET_AUTHENTICATED });
};


export const setUnAuthenticated = () => dispatch => {
  dispatch({ type: SET_UNAUTHENTICATED });
};
