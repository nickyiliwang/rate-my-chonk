import { combineReducers } from "redux";
import dataReducer from "./data/dataReducer";
import userReducer from "./user/userReducer";
import uiReducer from "./ui/uiReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
});
