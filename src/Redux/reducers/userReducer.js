import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
} from "../types";

const initialState = {
  authenticated: false,
  loading: false,
  credentials: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false
      };

    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload // spread the rest of the user obj
      };

    default:
      return state;
  }
}
