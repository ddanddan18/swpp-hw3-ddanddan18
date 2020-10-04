import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Article from "../../components/Article/Article";
import * as actionCreators from "../../store/actions/index";

class ArticleList extends Component {
  componentDidMount() {
    this.props.onGetArticles(this.props.articles);
  }

  onClickCreate = () => {
    // move on to create pag
    this.props.history.push("/articles/create");
  };
  clickTitleHandler = (atc) => {
    // move on to detail page
    this.props.history.push("/articles/" + atc.id);
  };

  render() {
    const articles = this.props.storedArticles.map((atc) => {
      // TODO article author name match
      return (
        <Article id={atc.id} title={atc.title} name={atc.author_id} clickTitle={() => this.clickTitleHandler(atc)} />
      );
    });

    return (
      <div className="ArticleList">
        <div className="articles">{articles}</div>
        <button id="create-article-button" onClick={() => this.onClickCreate()}>
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
    onGetArticles: (users) => dispatch(actionCreators.getArticles(users)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
