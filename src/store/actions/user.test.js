import axios from "axios";
// import * as router from 'connected-react-router';

import * as actionCreators from "./user";
import store from "../store";
import * as actionTypes from "./actionTypes";

const stubUser = {
  id: 1,
  name: "Software Lover",
  password: "iluvswpp",
  email: "swpp@snu.ac.kr",
  logged_in: false,
};

describe("UserActionCreators", () => {
  let spyGet;
  beforeEach(() => {
    spyGet = jest.spyOn(axios, "get").mockImplementation((url) => {
      switch (url) {
        case "/api/user":
          return new Promise((resolve, reject) => {
            const result = { status: 200, data: [stubUser] };
            resolve(result);
          });

        case "/api/user/1":
          return new Promise((resolve, reject) => {
            const result = { status: 200, data: { logged_in: true, id: 1 } };
            resolve(result);
          });

        default:
          break;
      }
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Implementation using `spyOn` API
  it("'getUsers' should fetch users correctly", () => {
    const stubUserList = [stubUser];

    return store.dispatch(actionCreators.getUsers()).then(() => {
      const newState = store.getState();
      expect(newState.user.users).toEqual(stubUserList);
      expect(spyGet).toHaveBeenCalledTimes(1);
    });
  });

  it("'getLoggedIn' should fetch logged-in user correctly", (done) => {
    const stubLoggedIn = [{ logged_in: true, id: 1 }];

    store.dispatch(actionCreators.getLoggedIn()).then(() => {
      const newState = store.getState();
      expect(newState.user.logged_in).toBe(stubLoggedIn.logged_in);
      expect(newState.user.id).toBe(stubLoggedIn.id);
      expect(spyGet).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'login' should put user's login correctly", (done) => {
    const stubLoggedIn = [{ id: 1 }];
    const spy = jest.spyOn(axios, "put").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLoggedIn,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.login()).then(() => {
      const newState = store.getState();
      expect(newState.user.id).toBe(stubLoggedIn.id);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });

  it("'logout' should put user's logout correctly", (done) => {
    const stubLoggedOut = [{ id: 1 }];
    const spy = jest.spyOn(axios, "put").mockImplementation((url) => {
      return new Promise((resolve, reject) => {
        const result = {
          status: 200,
          data: stubLoggedOut,
        };
        resolve(result);
      });
    });
    store.dispatch(actionCreators.logout()).then(() => {
      const newState = store.getState();
      expect(newState.user.id).toBe(stubLoggedOut.id);
      expect(spy).toHaveBeenCalledTimes(1);
      done();
    });
  });
});
