import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as articleActionCreators from "../../store/actions/article";

import NewArticle from "./NewArticle";

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

describe("<NewArticle />", () => {
  let newArticle, spyPostArticle;
  beforeEach(() => {
    newArticle = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={NewArticle} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyPostArticle = jest
      .spyOn(articleActionCreators, "postArticle")
      .mockImplementation((author_id, title, content) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(newArticle);
    const wrapper = component.find(".NewArticle");
    expect(wrapper.length).toBe(1);
  });

  it("should not post when title or content is blank", () => {
    const component = mount(newArticle);
    const wrapper = component
      .find(".NewArticle #confirm-create-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyPostArticle).toBeCalledTimes(0);
  });

  it('should call "postArticleHandler"', () => {
    const component = mount(newArticle);
    const titleWrapper = component.find("#article-title-input").at(0);
    titleWrapper.simulate("change", {
      target: { value: "test-title" },
    });
    const contentWrapper = component.find("#article-content-input").at(0);
    contentWrapper.simulate("change", {
      target: { value: "test-content" },
    });
    const wrapper = component
      .find(".NewArticle #confirm-create-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyPostArticle).toBeCalledTimes(1);
  });

  it('should call "backHandler" with not modifying', () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(newArticle);
    const wrapper = component
      .find(".NewArticle #back-create-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles");
  });

  it("should change between two tabs", () => {
    const component = mount(newArticle);
    const wrapper = component.find(".CreateArticleTab #preview-tab-button");
    wrapper.simulate("click");
    expect(
      component.find(NewArticle.WrappedComponent).instance().state.value
    ).toBe(2);
    const wrapper2 = component.find(".CreateArticleTab #write-tab-button");
    wrapper2.simulate("click");
    expect(
      component.find(NewArticle.WrappedComponent).instance().state.value
    ).toBe(1);
  });
});
