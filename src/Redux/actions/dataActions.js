import axios from "axios";
import { LOADING_DATA } from "../types";

// Get UserData
export const getAllChonks = userHandle => dispatch => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then(res => console.log(res))
    .catch(err => {
      console.error(err);
    });
};
