import React from "react";

import reducer from "./article";
import * as actionTypes from "../actions/actionTypes";

const stubArticle = {
  id: 0,
  author_id: 1,
  title: "10 React JS Articles Every Web Developer Should Read",
  content:
    "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.",
};

describe("Article Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ articles: [], selectedArticle: null });
  });

  it("should add article", () => {
    const newState = reducer(undefined, {
      type: actionTypes.ADD_ARTICLE,
      id: stubArticle.id,
      author_id: stubArticle.author_id,
      title: stubArticle.title,
      content: stubArticle.content,
    });
    expect(newState).toEqual({
      articles: [stubArticle],
      selectedArticle: null,
    });
  });

  it("should delete article", () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.DELETE_ARTICLE,
      targetID: 0,
    });
    expect(newState).toEqual({
      articles: [],
      selectedArticle: null,
    });
  });

  it("should edit article", () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const stubArticleEdit = { ...stubArticle, content: "edit content" };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_ARTICLE,
      target: stubArticleEdit,
    });
    expect(newState).toEqual({
      articles: [stubArticleEdit],
      selectedArticle: null,
    });
  });

  it("should not edit article with invalid request", () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const stubArticleEdit = { ...stubArticle, content: "edit content", id: 2 };
    const newState = reducer(stubInitialState, {
      type: actionTypes.EDIT_ARTICLE,
      target: stubArticleEdit,
    });
    expect(newState).not.toEqual({
      articles: [stubArticleEdit],
      selectedArticle: null,
    });
  });

  it("should get an article as selected", () => {
    const stubInitialState = {
      articles: [stubArticle],
      selectedArticle: null,
    };
    const newState = reducer(stubInitialState, {
      type: actionTypes.GET_ARTICLE,
      target: stubArticle,
    });
    expect(newState).toEqual({
      articles: stubInitialState.articles,
      selectedArticle: stubArticle,
    });
  });

  it("should get all articles", () => {
    const stubArtlces = [
      stubArticle,
      {
        ...stubArticle,
        id: 2,
        content: "article 2",
      },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_ALL_ARTICLES,
      articles: stubArtlces,
    });
    expect(newState).toEqual({
      articles: stubArtlces,
      selectedArticle: null,
    });
  });
});
