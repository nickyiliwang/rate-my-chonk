import {
  SET_CHONKS,
} from "../types";

const initialState = {
  chonks: [],
};

export default function(state = initialState, action) {
  switch (action.type) {

    case SET_CHONKS:
      return {
        ...state,
        chonks: [...state.chonks, action.payload],
      };

    default:
      return state;
  }
}
