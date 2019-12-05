import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// Reducers
import dataReducer from "./reducers/dataReducer";
import userReducer from "./reducers/userReducer";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
  user: userReducer,
  data: dataReducer
});

// store not containing dev tools
const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middleware))
);

// // store containing redux devtools
// const store = createStore(
//   reducers,
//   initialState,
//   compose(
//     applyMiddleware(...middleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   )
// );

export default store;
