import { SET_CHONKS, SET_CHONK, SET_USERS, LOADING_DATA, INCREMENT } from "../types";

const initialState = {
  chonks: [],
  chonk: {},
  users: [],
  count: 0,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };

      case INCREMENT:
        return {
          ...state,
          count: state.count + 1,
        }

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
