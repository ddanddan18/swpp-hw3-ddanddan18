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
export const getArticle_ = (atc) => {
  return { type: actionTypes.GET_ARTICLE, target: atc };
};

export const getArticle = (id) => {
  return (dispatch) => {
    return axios.get("/api/article/" + id).then((res) => dispatch(getArticle_(res.data)));
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
    console.log("postArticle", atc);
    return axios
      .post("/api/articles", atc)
      .then((res) => {
        dispatch(postArticle_(res.data));
        console.log("post done", res.data);
        return res.data.id;
      })
      .then((id) => dispatch(push("/articles/" + id)));
    //TODO post param
    // push 모듈 넣기
    //TODO atc.id 잘 받는지 확인 - id는 어찌된 것인가....
  };
};
