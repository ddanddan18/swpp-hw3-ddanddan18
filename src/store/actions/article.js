import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const getArticles_ = (articles, users) => {
  return { type: actionTypes.GET_ALL_ARTICLES, articles, users };
};

export const getArticles = (users) => {
  console.log("in getArticle action", users);
  return (dispatch) => {
    return axios.get("/api/articles").then((res) => dispatch(getArticles_(res.data, users)));
  };
};
export const getArticle_ = (article) => {
  return { type: actionTypes.GET_ARTICLE, target: article };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get("/api/article/" + id).then((res) => dispatch(getArticle_(res.data)));
  };
};
