import { GET_USERS, GET_LOGGED_IN, LOGIN, LOGOUT } from "../actions/actionTypes";
const initialState = {
  users: [],
  userId: null,
  isLoggedIn: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };

    case GET_LOGGED_IN:
      if (action.isLoggedIn == null) return { ...state, isLoggedIn: false };
      return { ...state, isLoggedIn: action.isLoggedIn };

    case LOGIN:
      let id = null;
      let isValidLogin = false;
      const modified = state.users.map((user) => {
        if (user.id === action.targetID) {
          id = user.id;
          isValidLogin = true;
          return { ...user, logged_in: true };
        } else {
          return { ...user };
        }
      });
      return { ...state, users: modified, isLoggedIn: isValidLogin, userId: id };
    default:
      break;
  }
  return state;
};
export default reducer;
