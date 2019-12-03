import { SET_AUTHENTICATED, SET_UNAUTHENTICATED,  } from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  favoriteCats: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
        credentials: { ...action.payload }
      };

    case SET_UNAUTHENTICATED:
      return {
        ...state,
        authenticated: false,
        credentials: {}
      };

    default:
      return state;
  }
}
