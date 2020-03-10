import { SET_CHONKS, SET_FAV, REMOVE_CHONKS } from "../types";

const initialState = {
  chonks: [],
  favChonks: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CHONKS:
      return {
        ...state,
        chonks: [...state.chonks, ...action.payload]
      };

    case REMOVE_CHONKS:
      return {
        ...state,
        chonks: []
      };

    case SET_FAV:
      return {
        ...state,
        favChonks: [...state.favChonks, ...action.payload]
      };

    default:
      return state;
  }
}
