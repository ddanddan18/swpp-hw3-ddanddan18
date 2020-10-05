import { GET_USERS, GET_LOGGED_IN, LOGIN, LOGOUT } from "../actions/actionTypes";
const initialState = {
  users: [],
  isLoggedIn: false,
  userID: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };

    case GET_LOGGED_IN:
      if (action.isLoggedIn == null) return { ...state, isLoggedIn: false, userID: null };
      return { ...state, isLoggedIn: action.isLoggedIn, userID: action.userID };

    case LOGIN:
      let loginId = null;
      let isValidLogin = false;
      const afterlLogin = state.users.map((user) => {
        if (user.id === action.targetID && !user.logged_in) {
          loginId = user.id;
          isValidLogin = true;
          return { ...user, logged_in: true };
        } else {
          return { ...user };
        }
      });
      return { ...state, users: afterlLogin, isLoggedIn: isValidLogin, userID: loginId };

    case LOGOUT:
      let logedinId = state.userID;
      let isValidLogout = false;
      const afterLogout = state.users.map((user) => {
        if (user.id === action.targetID && user.logged_in) {
          isValidLogout = true;
          logedinId = null;
          return { ...user, logged_in: false };
        } else {
          return { ...user };
        }
      });
      return { ...state, users: afterLogout, isLoggedIn: !isValidLogout, userID: logedinId };

    default:
      break;
  }
  return state;
};
export default reducer;
