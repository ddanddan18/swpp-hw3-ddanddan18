import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const getArticles_ = (articles) => {
  return { type: actionTypes.GET_ALL_ARTICLES, articles };
};

export const getArticles = () => {
  return (dispatch) => {
    return axios.get("/api/articles").then((res) => dispatch(getArticles_(res.data)));
  };
};
export const getArticle_ = (atc) => {
  return { type: actionTypes.GET_ARTICLE, target: atc };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get("/api/articles/" + id).then((res) => dispatch(getArticle_(res.data)));
  };
};

export const postArticle_ = (atc) => {
  return {
    type: actionTypes.ADD_ARTICLE,
    id: atc.id,
    author_id: atc.author_id,
    title: atc.title,
    content: atc.content,
  };
};

export const postArticle = (atc) => {
  return (dispatch) => {
    return axios
      .post("/api/articles", atc)
      .then((res) => {
        dispatch(postArticle_(res.data));
        return res.data.id;
      })
      .then((id) => dispatch(push("/articles/" + id)));
  };
};

export const deleteArticle_ = (id) => {
  return {
    type: actionTypes.DELETE_ARTICLE,
    targetID: id,
  };
};
export const deleteArticle = (id) => {
  return (dispatch) => {
    return axios
      .delete("/api/articles/" + id)
      .then((res) => {
        dispatch(deleteArticle_(id));
      })
      .then(() => dispatch(push("/articles")));
  };
};

export const editArticle_ = () => {
  return null;
};

export const editArticle = () => {
  return null;
};
