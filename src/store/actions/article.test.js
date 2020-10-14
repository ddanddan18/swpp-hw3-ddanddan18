import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./article";
import store from "../store";
import * as actionTypes from "./actionTypes";

const stubArticle = {
  id: 1,
  author_id: 1,
  title: "10 React JS Articles Every Web Developer Should Read",
  content:
    "Hello Guys, React or React JS is a JavaScript front-end library from Facebook which lets you create HTML based GUI. It makes the task easier by providing a component-based architecture which was only available to languages like Java and C# before.",
};
const newArticle = {
  id: 2,
  author_id: 1,
  title: "a b c d e title",
  content: "gyochon chicken",
};

describe("ArticleActionCreators", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Implementation using `spyOn` API
  it("'getArticles' should fetch users correctly", () => {
    const stubArticleList = [stubArticle];
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = { status: 200, data: stubArticleList };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getArticles()).then(() => {
      const newState = store.getState();
      expect(newState.atc.articles).toEqual(stubArticleList);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("'getArticle' should fetch the selected article correctly", () => {
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = { status: 200, data: stubArticle };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getArticle()).then(() => {
      const newState = store.getState();
      expect(newState.atc.selectedArticle).toEqual(stubArticle);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("'postArticle' should post article correctly", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url, atc) => {
      return new Promise((resolve, reject) => {
        const result = { status: 200, data: newArticle };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postArticle(newArticle)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.atc.articles).toEqual([stubArticle, newArticle]);
      done();
    });
  });

  it(`'deleteArticle' should delete article correctly`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: newArticle,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteArticle(newArticle.id)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.atc.articles).toEqual([stubArticle]); // not include removed newArticle
      done();
    });
  });

  it("'editArticle' should edit article correctly", (done) => {
    const stubArticleEdit = { ...stubArticle, content: "edit article content" };
    const spy = jest.spyOn(axios, "put").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubArticleEdit,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editArticle(stubArticleEdit)).then(() => {
      const newState = store.getState();
      expect(newState.atc.articles).toEqual([stubArticleEdit]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
