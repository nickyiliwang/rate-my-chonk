import {
  SET_CHONKS,
  SET_CHONK,
  SET_USERS,
} from "../types";

const initialState = {
  chonks: ["cat0", "cat1", "cat2", "cat3"],
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
