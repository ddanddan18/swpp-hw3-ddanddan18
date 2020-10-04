import { LOGIN, LOGOUT } from "../actions/actionTypes";
const initialState = {
  isLogin: false,
  id: null,
  pw: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      if (state.isLogin) alert("[Err] double login occured.");
      console.log("[Reducer] login action occured.");
      return { ...state, isLogin: true, id: action.id, pw: action.pw };

    case LOGOUT:
      if (!state.isLogin) alert("[Err] double logout occured.");
      console.log("[Reducer] logout action occured.");
      return { ...state, isLogin: false, id: null, pw: null };

    default:
      break;
  }
  return state;
};
export default reducer;
