import { GET_USERS } from "../actions/actionTypes";
const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.users };

    default:
      break;
  }
  return state;
};
export default reducer;
