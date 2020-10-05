import { ADD_ARTICLE, GET_ALL_ARTICLES, GET_ARTICLE } from "../actions/actionTypes";

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
      return { ...state, articles: state.articles.concat(newArticle), selectedArticle: newArticle };

    default:
      break;
  }
  return state;
};
export default reducer;
