import { ADD_COMMENT, DELETE_COMMENT, GET_ALL_COMMENTS } from "../actions/actionTypes";

const initialState = {
  comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS:
      return { ...state, comments: action.comments };

    case ADD_COMMENT:
      const newComment = {
        id: action.id,
        author_id: action.author_id,
        article_id: action.article_id,
        content: action.content,
      };
      return { ...state, comments: state.comments.concat(newComment) };

    case DELETE_COMMENT:
      const deleted = state.comments.filter((cmt) => {
        return cmt.id !== action.targetID;
      });
      return { ...state, comments: deleted };

    default:
      break;
  }
  return state;
};

export default reducer;
