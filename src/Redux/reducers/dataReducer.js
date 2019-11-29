import {
  SET_CHONKS,
  SET_CHONK,
  SET_USERS,
} from "../types";

const initialState = {
  chonks: [],
  chonk: {},
  users: [],
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_CHONKS:
      return {
        ...state,
        chonks: action.payload,
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
      };

    default:
      return state;
  }
}
