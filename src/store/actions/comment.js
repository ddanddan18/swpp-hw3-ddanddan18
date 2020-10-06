import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const getComments_ = (comments) => {
  return { type: actionTypes.GET_ALL_COMMENTS, comments: comments };
};

export const getComments = () => {
  return (dispatch) => {
    return axios.get("/api/comments").then((res) => {
      dispatch(getComments_(res.data));
    });
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

export const postComment_ = (cmt) => {
  return {
    type: actionTypes.ADD_COMMENT,
    id: cmt.id,
    author_id: cmt.author_id,
    article_id: cmt.article_id,
    content: cmt.content,
  };
};
export const postComment = (cmt) => {
  return (dispatch) => {
    return axios.post("/api/comments", cmt).then((res) => {
      dispatch(postComment_(res.data));
      return res.data.id;
    });
  };
};

export const deleteComment_ = (id) => {
  return {
    type: actionTypes.DELETE_COMMENT,
    targetID: id,
  };
};
export const deleteComment = (id) => {
  return (dispatch) => {
    return axios.delete("/api/comments/" + id).then((res) => {
      dispatch(deleteComment_(id));
    });
  };
};

export const editComment_ = (cmt) => {
  return { type: actionTypes.EDIT_COMMENT, target: cmt };
};

export const editComment = (cmt) => {
  return (dispatch) => {
    return axios.put("/api/comments/" + cmt.id, cmt).then((res) => {
      dispatch(editComment_(res.data));
    });
  };
};
