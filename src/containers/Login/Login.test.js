import React from "react";
import Login from "./Login";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as userActionCreators from "../../store/actions/user";

const stubArticleInitialState = {
  articles: [],
  selectedArticle: null,
};
const stubLoginUserInitialState = {
  users: [
    { id: 1, name: "USER_TEST_NAME1" },
    { id: 2, name: "USER_TEST_NAME2" },
  ],
  isLoggedIn: true,
  userID: 1,
};
const stubNotLoginUserInitialState = {
  ...stubLoginUserInitialState,
  isLoggedIn: false,
  userID: null,
};
const stubNoUserInitialState = {
  users: [],
  isLoggedIn: false,
  userID: null,
};
const stubCommentInitialState = {
  comments: [],
};

const mockStoreLogin = getMockStore(
  stubArticleInitialState,
  stubLoginUserInitialState,
  stubCommentInitialState
);
const mockStoreNotLogin = getMockStore(
  stubArticleInitialState,
  stubNotLoginUserInitialState,
  stubCommentInitialState
);
const mockStoreNoData = getMockStore(
  stubArticleInitialState,
  stubNoUserInitialState,
  stubCommentInitialState
);

describe("<Login />", () => {
  let login, notLogin, noDataLogin, spyLogin, spyGetUsers, spyGetLoggedIn;
  beforeEach(() => {
    login = (
      <Provider store={mockStoreLogin}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Login />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    notLogin = (
      <Provider store={mockStoreNotLogin}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Login />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    noDataLogin = (
      <Provider store={mockStoreNoData}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Login />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyLogin = jest
      .spyOn(userActionCreators, "login")
      .mockImplementation((user) => {
        return (dispatch) => {};
      });
    spyGetUsers = jest
      .spyOn(userActionCreators, "getUsers")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
    spyGetLoggedIn = jest
      .spyOn(userActionCreators, "getLoggedIn")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(notLogin);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(1);
  });
  it("should get users and login datas when there is no data", () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation((word) => {
      return true;
    });
    const component = mount(noDataLogin);
    const wrapper = component.find(".Login #login-button");
    wrapper.simulate("click");
    expect(spyGetUsers).toBeCalledTimes(1);
    expect(spyGetLoggedIn).toBeCalledTimes(1);
    expect(spyAlert).toBeCalledTimes(1);
  });

  it("should not login when input id, pw are wrong", () => {
    const spyAlert = jest.spyOn(window, "alert").mockImplementation((word) => {
      return true;
    });
    const component = mount(notLogin);
    const IdWrapper = component.find(".Login #email-input").at(0);
    const PwWrapper = component.find(".Login #pw-input").at(0);
    IdWrapper.simulate("change", {
      target: { value: "invalid-id" },
    });
    PwWrapper.simulate("change", {
      target: { value: "invalid-pw" },
    });
    const wrapper = component.find(".Login #login-button").at(0);
    wrapper.simulate("click");
    expect(spyAlert).toBeCalledTimes(2);
  });

  it("should login when input id, pw are valid", () => {
    const component = mount(notLogin);
    const IdWrapper = component.find(".Login #email-input").at(0);
    const PwWrapper = component.find(".Login #pw-input").at(0);
    IdWrapper.simulate("change", {
      target: { value: "swpp@snu.ac.kr" },
    });
    PwWrapper.simulate("change", {
      target: { value: "iluvswpp" },
    });
    const wrapper = component.find(".Login #login-button").at(0);
    wrapper.simulate("click");
    expect(spyLogin).toBeCalledTimes(1);
  });

  it("should not render and redirect to articles page", () => {
    const component = mount(login);
    const wrapper = component.find(".Login");
    expect(wrapper.length).toBe(0);
  });
});
