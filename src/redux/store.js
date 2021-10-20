import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./reducer/user";
import post from "./reducer/post";
import album from "./reducer/album";

const rootReducers = combineReducers({
  user,
  post,
  album,
});

const store = createStore(rootReducers, applyMiddleware(thunk));

export default store;
