import React from "react";
import Logout from "./Logout";
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
const stubCommentInitialState = {
  comments: [],
};

const mockStoreLogin = getMockStore(
  stubArticleInitialState,
  stubLoginUserInitialState,
  stubCommentInitialState
);

describe("<Logout />", () => {
  let logout, spyLogout;
  beforeEach(() => {
    logout = (
      <Provider store={mockStoreLogin}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <Logout />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );

    spyLogout = jest
      .spyOn(userActionCreators, "logout")
      .mockImplementation((user) => {
        return (dispatch) => {};
      });
  });

  it("should render without errors", () => {
    const component = mount(logout);
    const wrapper = component.find(".Logout");
    expect(wrapper.length).toBe(1);
  });
  it("should call 'onLogout' clicking logout-button", () => {
    const component = mount(logout);
    const wrapper = component.find(".Logout #logout-button").at(0);
    wrapper.simulate("click");
    expect(spyLogout).toBeCalledTimes(1);
  });
});
