import React, { Component } from "react";
import { connect } from "react-redux";
import Article from "../../components/Article/Article";
import * as actionCreators from "../../store/actions/index";
import Logout from "../Login/Logout";

class ArticleList extends Component {
  componentDidMount() {
    this.props.onGetArticles();
  }

  clickCreateHandler = () => {
    // move on to create pag
    this.props.history.push("/articles/create");
  };
  clickTitleHandler = (atc) => {
    // move on to detail page
    this.props.history.push("/articles/" + atc.id);
  };

  render() {
    const articles = this.props.storedArticles.map((atc) => {
      // get author name from author_id
      const authorUser = this.props.users.find((user) => user.id === atc.author_id);

      return (
        <Article
          key={atc.id}
          id={atc.id}
          title={atc.title}
          name={authorUser.name}
          clickTitle={() => this.clickTitleHandler(atc)}
        />
      );
    });

    return (
      <div className="ArticleList">
        <Logout />
        <div className="articles">{articles}</div>

        <button
          id="create-article-button"
          onClick={() => {
            this.clickCreateHandler();
          }}
        >
          Create Article
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storedArticles: state.atc.articles,
    users: state.user.users,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetArticles: () => dispatch(actionCreators.getArticles()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
