import { GET_USERS, GET_LOGGED_IN, LOGIN, LOGOUT } from "../actions/actionTypes";
const initialState = {
  users: [],
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
      const afterlLogin = state.users.map((user) => {
        if (user.id === action.targetID && !user.logged_in) {
          id = user.id;
          isValidLogin = true;
          return { ...user, logged_in: true };
        } else {
          return { ...user };
        }
      });
      return { ...state, users: afterlLogin, isLoggedIn: isValidLogin };

    case LOGOUT:
      let isValidLogout = false;
      const afterLogout = state.users.map((user) => {
        if (user.id === action.targetID && user.logged_in) {
          isValidLogout = true;
          return { ...user, logged_in: false };
        } else {
          return { ...user };
        }
      });
      return { ...state, users: afterLogout, isLoggedIn: !isValidLogout };

    default:
      break;
  }
  return state;
};
export default reducer;
