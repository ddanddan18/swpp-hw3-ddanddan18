import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as articleActionCreators from "../../store/actions/article";

import EditArticle from "./EditArticle";

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

describe("<EditArticle />", () => {
  let editArticle, spyGetArticle, spyEditArticle;
  beforeEach(() => {
    editArticle = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={EditArticle} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetArticle = jest
      .spyOn(articleActionCreators, "getArticle")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    spyEditArticle = jest
      .spyOn(articleActionCreators, "editArticle")
      .mockImplementation((atc) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(editArticle);
    const wrapper = component.find(".EditArticle");
    expect(wrapper.length).toBe(1);
  });
  it(`should render with default value`, () => {
    const component = mount(editArticle);
    const initInstance = component
      .find(EditArticle.WrappedComponent)
      .instance();
    expect(initInstance.state.title).toBe("SELECTED_ARTICLE_TEST_TITLE");
    expect(initInstance.state.content).toBe("SELECTED_ARTICLE_TEST_CONTENT");
  });

  it('should call "confirmHandler"', () => {
    const component = mount(editArticle);
    const wrapper = component
      .find(".EditArticle #confirm-edit-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyEditArticle).toBeCalledTimes(1);
  });

  it('should not edit when it calls "confirmHandler" with blank ', () => {
    const component = mount(editArticle);
    const contentWrapper = component.find("#article-content-input").at(0);
    contentWrapper.simulate("change", {
      target: { value: "" },
    });
    const wrapper = component
      .find(".EditArticle #confirm-edit-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyEditArticle).toBeCalledTimes(1);
  });

  it('should call "backHandler" with not modifying', () => {
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(editArticle);
    const wrapper = component
      .find(".EditArticle #back-edit-article-button")
      .at(0);
    wrapper.simulate("click");
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles/1");
  });

  it('should call "backHandler" with modifying', () => {
    const spyConfirm = jest
      .spyOn(window, "confirm")
      .mockImplementation((word) => {
        return true;
      });
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(editArticle);
    const wrapper = component
      .find(".EditArticle #back-edit-article-button")
      .at(0);
    const contentWrapper = component.find("#article-title-input");
    contentWrapper.simulate("change", {
      target: { value: "modify title test" },
    });
    const titleWrapper = component.find("#article-content-input");
    titleWrapper.simulate("change", {
      target: { value: "modify content test" },
    });
    wrapper.simulate("click");
    expect(
      component.find(EditArticle.WrappedComponent).instance().state.title
    ).toBe("modify title test");
    expect(
      component.find(EditArticle.WrappedComponent).instance().state.content
    ).toBe("modify content test");
    expect(spyConfirm).toBeCalledTimes(1);
    expect(spyHistoryPush).toHaveBeenCalledWith("/articles/1");
  });

  it('should call "backHandler" with modifying but return to edit', () => {
    const spyConfirmFalse = jest
      .spyOn(window, "confirm")
      .mockImplementation((word) => {
        return false;
      });
    const spyHistoryPush = jest
      .spyOn(history, "push")
      .mockImplementation((path) => {});
    const component = mount(editArticle);
    const wrapper = component
      .find(".EditArticle #back-edit-article-button")
      .at(0);
    const contentWrapper = component.find("#article-title-input");
    contentWrapper.simulate("change", {
      target: { value: "modify title test" },
    });
    const titleWrapper = component.find("#article-content-input");
    titleWrapper.simulate("change", {
      target: { value: "modify content test" },
    });
    wrapper.simulate("click");
    expect(spyHistoryPush).toBeCalledTimes(2);
  });

  it("should change between two tabs", () => {
    const component = mount(editArticle);
    const wrapper = component.find(".EditTab #preview-tab-button");
    wrapper.simulate("click");
    expect(
      component.find(EditArticle.WrappedComponent).instance().state.value
    ).toBe(2);
    const wrapper2 = component.find(".EditTab #write-tab-button");
    wrapper2.simulate("click");
    expect(
      component.find(EditArticle.WrappedComponent).instance().state.value
    ).toBe(1);
  });
});
