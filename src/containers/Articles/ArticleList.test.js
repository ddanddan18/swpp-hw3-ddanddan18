import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as articleActionCreators from "../../store/actions/article";

import ArticleList from "./ArticleList";

const stubArticleInitialState = {
  articles: [
    {
      id: 1,
      author_id: 1,
      title: "SELECTED_ARTICLE_TEST_TITLE",
      content: "SELECTED_ARTICLE_TEST_CONTENT",
    },
  ],
  selectedArticle: null,
};

const stubUserInitialState = {
  users: [
    { id: 1, name: "USER_TEST_NAME1" },
    { id: 2, name: "USER_TEST_NAME2" },
  ],
  isLoggedIn: true,
  userID: 1,
};
// const stubUserInitialState2 = { ...stubUserInitialState, userID: 2 };
const stubCommentInitialState = {
  comments: [],
};

const mockStore = getMockStore(
  stubArticleInitialState,
  stubUserInitialState,
  stubCommentInitialState
);
// const mockStore2 = getMockStore(
//   stubArticleInitialState,
//   stubUserInitialState2,
//   stubCommentInitialState
// );

describe("<ArticleList />", () => {
  let articleList, spyGetArticles, spyHistoryPush;
  beforeEach(() => {
    articleList = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={ArticleList} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticles = jest
      .spyOn(articleActionCreators, "getArticles")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
  });

  it("should render without errors", () => {
    const component = mount(articleList);
    const wrapper = component.find(".ArticleList");
    expect(wrapper.length).toBe(1);
  });
  it(`should render SELECTED_ARTICLE`, () => {
    const component = mount(articleList);
    const wrapper = component.find("Article");
    expect(wrapper.length).toBe(stubArticleInitialState.articles.length);
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
            <Route path="/" exact component={ArticleList} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    const wrapper = component.find(".articles");
    expect(wrapper.at(0).text()).toBe("");
  });
  it('should call "clickCreateHandler"', () => {
    const component = mount(articleList);
    const wrapper = component.find("#create-article-button").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles/create");
  });
  it('should call "clickTitleHandler"', () => {
    const component = mount(articleList);
    const wrapper = component.find("Article .title").at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles/1");
  });
});
