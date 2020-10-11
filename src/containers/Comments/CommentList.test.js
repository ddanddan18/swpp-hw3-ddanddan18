import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as articleCommentActionCreators from "../../store/actions/comment";

import CommentList from "./CommentList";

const stubArticleInitialState = {
  articles: [
    {
      id: 1,
      author_id: 1,
      title: "SELECTED_ARTICLE_TEST_TITLE",
      content: "SELECTED_ARTICLE_TEST_CONTENT",
    },
  ],
  selectedArticle: {
    id: 1,
    author_id: 1,
    title: "SELECTED_ARTICLE_TEST_TITLE",
    content: "SELECTED_ARTICLE_TEST_CONTENT",
  },
};

const stubUserInitialState = {
  users: [
    { id: 1, name: "USER_TEST_NAME1" },
    { id: 2, name: "USER_TEST_NAME2" },
  ],
  isLoggedIn: true,
  userID: 1,
};
const stubUserInitialState2 = { ...stubUserInitialState, userID: 2 };
const stubCommentInitialState = {
  comments: [{ id: 1, article_id: 1, author_id: 1, content: "comment1" }],
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
  stubCommentInitialState
);
const mockStore2 = getMockStore(
  stubArticleInitialState,
  stubUserInitialState2,
  stubCommentInitialState
);

describe("<CommentList />", () => {
  let commentList,
    notMyComment,
    spyGetComments,
    spyDeleteComment,
    spyEditComment;
  beforeEach(() => {
    commentList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CommentList articleID={1} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    notMyComment = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CommentList articleID={1} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetComments = jest
      .spyOn(articleCommentActionCreators, "getComments")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    spyDeleteComment = jest
      .spyOn(articleCommentActionCreators, "deleteComment")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    spyEditComment = jest
      .spyOn(articleCommentActionCreators, "editComment")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(commentList);
    const wrapper = component.find(".CommentList");
    expect(wrapper.length).toBe(1);
  });
  it(`should not render any comments`, () => {
    const mockInitialStore = getMockStore(
      {
        articles: [],
        selectedArticle: null,
      },
      {
        users: [{ id: 1, name: "USER_TEST_NAME1" }],
        isLoggedIn: true,
        userID: 1,
      },
      {
        comments: [],
      }
    );
    const component = mount(
      <Provider store={mockInitialStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route
              path="/"
              exact
              render={() => <CommentList articleID={1} />}
            />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find(".Comment");
    expect(wrapper.length).toBe(0);
  });
  it('should call "deleteHandler"', () => {
    const component = mount(commentList);
    const wrapper = component.find("button#delete-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyDeleteComment).toBeCalledTimes(1);
  });
  it('should call "editHandler" and edit new comment', () => {
    const spyPromptWithNewComment = jest
      .spyOn(window, "prompt")
      .mockImplementation((word, content) => {
        return "new comment";
      });
    const component = mount(commentList);
    const wrapper = component.find("button#edit-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyPromptWithNewComment).toBeCalledTimes(1);
    expect(spyEditComment).toBeCalledTimes(1);
  });
  it('should call "editHandler" and edit new comment', () => {
    const spyPromptWithNoComment = jest
      .spyOn(window, "prompt")
      .mockImplementation((word, content) => {
        return null;
      });
    const component = mount(commentList);
    const wrapper = component.find("button#edit-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyEditComment).toBeCalledTimes(1);
  });
  it('should call "editHandler" and edit anything', () => {
    const spyPromptWithNoEdit = jest
      .spyOn(window, "prompt")
      .mockImplementation((word, content) => {
        return content;
      });
    const component = mount(commentList);
    const wrapper = component.find("button#edit-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyEditComment).toBeCalledTimes(1);
  });
  it("should not call 'editHandler' in other's comment", () => {
    const component = mount(notMyComment);
    const wrapper = component.find("button#edit-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyEditComment).not.toBeCalledTimes(2);
  });
  it("should not call 'deleteHandler' in other's comment", () => {
    const component = mount(notMyComment);
    const wrapper = component.find("button#delete-comment-button").at(0);
    wrapper.simulate("click");
    expect(spyDeleteComment).not.toBeCalledTimes(2);
  });
});
