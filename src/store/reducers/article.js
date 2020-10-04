import { GET_ALL_ARTICLES, GET_ARTICLE } from "../actions/actionTypes";

const initialState = {
  articles: [],
  selectedArticle: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_ARTICLES:
      return { ...state, articles: action.articles };
    // const articlesWithName = action.articles.map((atc) => {
    //   return { ...atc, author_name: action.users.find((user) => user.id === atc.author_id).name };
    // });
    // console.log(articlesWithName);
    // return { ...state, articles: articlesWithName };

    case GET_ARTICLE:
      return { ...state, selectedArticle: action.target };

    default:
      break;
  }
  return state;
};
export default reducer;
