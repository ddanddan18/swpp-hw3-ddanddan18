import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { connectRouter, routerMiddleware } from "connected-react-router";

import { history, middlewares } from "../index";
import * as actionTypes from "../store/actions/actionTypes";

const getMockArticleReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

const getMockUserReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);
const getMockCommentReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  }
);

export const getMockStore = (initialArticle, initialUser, initialComment) => {
  const mockArticleReducer = getMockArticleReducer(initialArticle);
  const mockUserReducer = getMockUserReducer(initialUser);
  const mockCommentReducer = getMockCommentReducer(initialComment);
  const rootReducer = combineReducers({
    atc: mockArticleReducer,
    user: mockUserReducer,
    cmt: mockCommentReducer,
    router: connectRouter(history),
  });
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return mockStore;
};
