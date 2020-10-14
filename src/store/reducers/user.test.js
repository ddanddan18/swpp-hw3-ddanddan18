import React from "react";

import reducer from "./user";
import * as actionTypes from "../actions/actionTypes";

const stubUser = {
  id: 1,
  name: "Software Lover",
  password: "iluvswpp",
  email: "swpp@snu.ac.kr",
  logged_in: false,
};

describe("User Reducer", () => {
  it("should return default state", () => {
    const newState = reducer(undefined, {}); // initialize
    expect(newState).toEqual({ users: [], isLoggedIn: false, userID: null });
  });

  it("should login", () => {
    const stubInitialState = {
      users: [stubUser],
      isLoggedIn: false,
      userID: null,
    };
    let newState = reducer(stubInitialState, {
      type: actionTypes.LOGIN,
      targetID: 1,
    });
    expect(newState).toEqual({
      users: [{ ...stubUser, logged_in: true }],
      isLoggedIn: true,
      userID: 1,
    });
  });

  it("should logout", () => {
    const stubInitialState = {
      users: [{ ...stubUser, logged_in: true }],
      isLoggedIn: true,
      userID: 1,
    };
    let newState = reducer(stubInitialState, {
      type: actionTypes.LOGOUT,
      targetID: 1,
    });
    expect(newState).toEqual({
      users: [{ ...stubUser, logged_in: false }],
      isLoggedIn: false,
      userID: null,
    });
  });

  it("should not logout with unmatched logout request", () => {
    const stubInitialState = {
      users: [{ ...stubUser, logged_in: true }],
      isLoggedIn: true,
      userID: 1,
    };
    let newState = reducer(stubInitialState, {
      type: actionTypes.LOGOUT,
      targetID: 2,
    });
    expect(newState).toEqual({
      ...stubInitialState,
    });
  });

  it("should get default logged_in with no data", () => {
    const stubLoggedIn = { isLoggedIn: null, userID: 1 };
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGGED_IN,
      ...stubLoggedIn,
    });
    expect(newState).toEqual({
      users: [],
      isLoggedIn: false,
      userID: null,
    });
  });

  it("should get default logged_in with invalid request", () => {
    const stubLoggedIn = { isLoggedIn: false, userID: 1 };
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGGED_IN,
      ...stubLoggedIn,
    });
    expect(newState).toEqual({
      users: [],
      isLoggedIn: false,
      userID: null,
    });
  });

  it("should get logged_in", () => {
    const stubLoggedIn = { isLoggedIn: true, userID: 1 };
    const newState = reducer(undefined, {
      type: actionTypes.GET_LOGGED_IN,
      ...stubLoggedIn,
    });
    expect(newState).toEqual({
      users: [],
      isLoggedIn: stubLoggedIn.isLoggedIn,
      userID: stubLoggedIn.userID,
    });
  });

  it("should get all users", () => {
    const stubUsers = [
      {
        id: 1,
        name: "Software Lover",
        password: "iluvswpp",
        email: "swpp@snu.ac.kr",
        logged_in: false,
      },
      {
        id: 2,
        name: "Software Lover2",
        password: "iluvswpp2",
        email: "swpp2@snu.ac.kr",
        logged_in: false,
      },
    ];
    const newState = reducer(undefined, {
      type: actionTypes.GET_USERS,
      users: stubUsers,
    });
    expect(newState).toEqual({
      users: stubUsers,
      isLoggedIn: false,
      userID: null,
    });
  });
});
