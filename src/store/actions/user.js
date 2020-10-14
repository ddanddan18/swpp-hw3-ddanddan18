import * as actionTypes from "./actionTypes";
import axios from "axios";

export const getUsers_ = (users) => {
  console.log("getUsers_");
  return { type: actionTypes.GET_USERS, users };
};

export const getUsers = () => {
  return (dispatch) => {
    console.log("getUsers");
    return axios.get("/api/user").then((res) => {
      console.log("getUsers - after axios");
      dispatch(getUsers_(res.data));
    });
  };
};

export const getLoggedIn_ = (loggedIn, userID) => {
  return {
    type: actionTypes.GET_LOGGED_IN,
    isLoggedIn: loggedIn,
    userID: userID,
  };
};

export const getLoggedIn = () => {
  return (dispatch) => {
    return axios.get("/api/user/1").then((res) => {
      dispatch(getLoggedIn_(res.data.logged_in, res.data.id));
    });
  };
};

export const login_ = (id) => {
  return { type: actionTypes.LOGIN, targetID: id };
};

export const login = (user) => {
  return (dispatch) => {
    return axios
      .put("/api/user/1", {
        ...user,
        logged_in: true,
      })
      .then((res) => {
        dispatch(login_(res.data.id));
      });
  };
};
export const logout_ = (id) => {
  return { type: actionTypes.LOGOUT, targetID: id };
};

export const logout = (user) => {
  return (dispatch) => {
    return axios
      .put("/api/user/1", {
        ...user,
        logged_in: false,
      })
      .then((res) => {
        dispatch(logout_(res.data.id));
      });
  };
};
