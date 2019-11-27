import { INCREMENT } from "../types";

export const increment = () => dispatch => {
  dispatch({ type: INCREMENT });
};
