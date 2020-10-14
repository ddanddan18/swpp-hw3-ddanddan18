import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./comment";
import store from "../store";
import * as actionTypes from "./actionTypes";

const stubComment = {
  id: 1,
  article_id: 1,
  author_id: 1,
  content: "What do you mean wow?",
};
const newComment = {
  id: 2,
  article_id: 1,
  author_id: 2,
  content: "I don't know",
};

describe("CommentActionCreators", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Implementation using `spyOn` API
  it("'getComments' should fetch users correctly", () => {
    const stubCommentList = [stubComment];
    const spy = jest.spyOn(axios, "get").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = { status: 200, data: stubCommentList };
        resolve(result);
      });
    });

    return store.dispatch(actionCreators.getComments()).then(() => {
      const newState = store.getState();
      expect(newState.cmt.comments).toEqual(stubCommentList);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it("'postComment' should post comment correctly", (done) => {
    const spy = jest.spyOn(axios, "post").mockImplementation((url, cmt) => {
      return new Promise((resolve, reject) => {
        const result = { status: 200, data: newComment };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.postComment(newComment)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      const newState = store.getState();
      expect(newState.cmt.comments).toEqual([stubComment, newComment]);
      done();
    });
  });

  it(`'deleteComment' should delete comment correctly`, (done) => {
    const spy = jest.spyOn(axios, "delete").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: null,
        };
        resolve(result);
      });
    });

    store.dispatch(actionCreators.deleteComment(newComment.id)).then(() => {
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'editComment' should edit comment correctly", (done) => {
    const stubCommentEdit = { ...stubComment, content: "edit comment content" };
    const spy = jest.spyOn(axios, "put").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubCommentEdit,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.editComment(stubCommentEdit)).then(() => {
      const newState = store.getState();
      expect(newState.cmt.comments).toEqual([stubCommentEdit]);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
