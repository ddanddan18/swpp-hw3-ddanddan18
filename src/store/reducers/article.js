import { ADD_ARTICLE, DELETE_ARTICLE, DELETE_COMMENT, GET_ALL_ARTICLES, GET_ARTICLE } from "../actions/actionTypes";

const initialState = {
  articles: [],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, articles: action.articles };

    case GET_ARTICLE:
      return { ...state, selectedArticle: action.target };

    case ADD_ARTICLE:
      const newArticle = {
        id: action.id,
        author_id: action.author_id,
        title: action.title,
        content: action.content,
      };
      return { ...state, articles: state.articles.concat(newArticle) };

    case DELETE_ARTICLE:
      const deleted = state.articles.filter((atc) => {
        return atc.id !== action.targetID;
      });
      return { ...state, articles: deleted };

    default:
      break;
  }
  return state;
};
export default reducer;
