import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./reducer/user";
import post from "./reducer/post";

const rootReducers = combineReducers({
  user,
  post,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
