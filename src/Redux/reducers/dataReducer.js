import { SET_CHONKS, SET_CHONK, SET_USERS, LOADING_DATA } from "../types";

const initialState = {
  chonks: [],
  chonk: {},
  users: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

    case SET_CHONKS:
      return {
        ...state,
        chonks: action.payload,
        loading: false
      };

    case SET_CHONK:
      return {
        ...state,
        chonk: action.payload
      };

    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };

    default:
      return state;
  }
}
