import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createStore, combineReducers, applyMiddleware } from "redux";
import articleReducer from "./reducers/article";
import userReducer from "./reducers/user";
import commentReducer from "./reducers/comment";
import { composeWithDevTools } from "redux-devtools-extension";

export const history = createBrowserHistory();
export const rootReducer = combineReducers({
  atc: articleReducer,
  user: userReducer,
  cmt: commentReducer,
  router: connectRouter(history),
});

export const middlewares = [thunk, routerMiddleware(history)];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)))
);

export default store;
