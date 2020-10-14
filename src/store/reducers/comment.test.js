import React from "react";

import reducer from "./comment";
import * as actionTypes from "../actions/actionTypes";

const stubComment = {
  id: 1,
  article_id: 0,
  author_id: 2,
  content: "What do you mean wow?",
};

describe("Comment Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ comments: [] });
  });

  it("should add comment", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_COMMENT,
      id: stubComment.id,
      author_id: stubComment.author_id,
      article_id: stubComment.article_id,
      content: stubComment.content,
    });
    expect(newState).toEqual({
      comments: [stubComment],
    });
  });

  it("should delete comment", () => {
    const stubInitialState = {
      comments: [stubComment],
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_COMMENT,
      targetID: 1,
    });
    expect(newState).toEqual({
      comments: [],
    });
  });

  it("should edit comment", () => {
    const stubInitialState = {
      comments: [stubComment],
    };
    const stubCommentEdit = { ...stubComment, content: "edit content" };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_COMMENT,
      target: stubCommentEdit,
    });
    expect(newState).toEqual({
      comments: [stubCommentEdit],
    });
  });

  it("should not edit comment with invalid request", () => {
    const stubInitialState = {
      comments: [stubComment],
    };
    const stubCommentEdit = { ...stubComment, content: "edit content", id: 2 };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_COMMENT,
      target: stubCommentEdit,
    });
    expect(newState).not.toEqual({
      comments: [stubCommentEdit],
    });
  });

  it("should get all comments", () => {
    const stubComments = [
      stubComment,
      {
        ...stubComment,
        id: 2,
        content: "comment 2",
      },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL_COMMENTS,
      comments: stubComments,
    });
    expect(newState).toEqual({
      comments: stubComments,
    });
  });
});
