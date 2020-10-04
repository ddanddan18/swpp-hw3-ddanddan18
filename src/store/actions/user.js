import * as actionTypes from "./actionTypes";
import axios from "axios";
import { push } from "connected-react-router";

export const getUsers_ = (users) => {
  return { type: actionTypes.GET_USERS, users };
};

export const getUsers = () => {
  return (dispatch) => {
    return axios.get("/api/user").then((res) => dispatch(getUsers_(res.data)));
  };
};
