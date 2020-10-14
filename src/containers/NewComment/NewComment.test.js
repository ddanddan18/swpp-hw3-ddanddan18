import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as commentActionCreators from "../../store/actions/comment";

import NewComment from "./NewComment";

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
  users: [{ id: 1, name: "USER_TEST_NAME1" }],
  isLoggedIn: true,
  userID: 1,
};
const stubCommentInitialState = {
  comments: [],
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
  stubCommentInitialState
);

describe("<NewComment />", () => {
  let newComment, spyPostComment;
  beforeEach(() => {
    newComment = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={NewComment} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyPostComment = jest
      .spyOn(commentActionCreators, "postComment")
      .mockImplementation((author_id, article_id, content) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(newComment);
    const wrapper = component.find(".NewComment");
    expect(wrapper.length).toBe(1);
  });

  it("should not post when content is blank", () => {
    const component = mount(newComment);
    const wrapper = component
      .find(".NewComment #confirm-create-comment-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyPostComment).toBeCalledTimes(0);
  });

  it('should call "postCommentHandler"', () => {
    const component = mount(newComment);
    const contentWrapper = component.find("#new-comment-content-input").at(0);
    contentWrapper.simulate("change", {
      target: { value: "test-content" },
    });
    const wrapper = component
      .find(".NewComment #confirm-create-comment-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyPostComment).toBeCalledTimes(1);
  });
});
