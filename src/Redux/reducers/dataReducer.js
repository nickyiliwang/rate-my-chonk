import {
  SET_CHONKS,
} from "../types";

const initialState = {
  chonks: [{id: "cat0", url: {}}, "cat1", "cat2", "cat3"],
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
