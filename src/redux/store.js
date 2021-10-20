import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./reducer/user";

const rootReducers = combineReducers({
  user,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
