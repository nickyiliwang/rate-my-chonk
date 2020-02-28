import { combineReducers } from "redux";

// Reducers
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";
import uiReducer from "./reducers/uiReducer";

export const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  ui: uiReducer
});
