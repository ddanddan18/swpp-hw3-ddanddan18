import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as articleActionCreators from "../../store/actions/article";

import Detail from "./Detail";

const stubArticleInitialState = {
  articles: [],
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
  comments: [
    { id: 1, article_id: 1, author_id: 1, content: "comment1" },
    { id: 2, article_id: 1, author_id: 2, content: "comment2" },
  ],
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

describe("<Detail />", () => {
  let detail, spyGetArticle, spyDeleteArticle, notMyDetail;
  beforeEach(() => {
    detail = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Detail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    notMyDetail = (
      <Provider store={mockStore2}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Detail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest
      .spyOn(articleActionCreators, "getArticle")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    spyDeleteArticle = jest
      .spyOn(articleActionCreators, "deleteArticle")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(detail);
    const wrapper = component.find(".Detail");
    expect(wrapper.length).toBe(1);
  });
  it(`should render SELECTED_ARTICLE`, () => {
    const component = mount(detail);
    const wrapper = component.find("ArticleView");
    expect(wrapper.props().title).toBe("SELECTED_ARTICLE_TEST_TITLE");
    expect(wrapper.props().content).toBe("SELECTED_ARTICLE_TEST_CONTENT");
  });
  it(`should not render SELECTED_ARTICLE`, () => {
    const mockInitialStore = getMockStore(
      { articles: [], selectedArticle: null },
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
            <Route path="/" exact component={Detail} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find("ArticleView");
    expect(wrapper.props().title).toBe("");
    expect(wrapper.props().content).toBe("");
  });
  it('should call "deleteHandler"', () => {
    const component = mount(detail);
    const wrapper = component.find(".Detail #delete-article-button").at(0);
    wrapper.simulate("click");
    expect(spyDeleteArticle).toBeCalledTimes(1);
  });
  it('should call "editHandler"', () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(detail);
    const wrapper = component.find(".Detail #edit-article-button").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles/1/edit");
  });
  it('should call "backHandler"', () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(detail);
    const wrapper = component.find(".Detail #back-detail-article-button").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles");
  });
  it("should not call 'editHandler' in other's article", () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(notMyDetail);
    const wrapper = component.find(".Detail #edit-article-button").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).not.toHaveBeenLastCalledWith("/articles/1/edit");
  });
  it("should not call 'deleteHandler' in other's article", () => {
    const component = mount(notMyDetail);
    const wrapper = component.find(".Detail #delete-article-button").at(0);
    wrapper.simulate("click");
    expect(spyDeleteArticle).not.toBeCalledTimes(2);
  });
});
