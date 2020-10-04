import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Article from "../../components/Article/Article";

class ArticleList extends Component {
  render() {
    const articles = this.props.storedArticles.map((td) => {
      // TODO article component
      return <Article />;
    });

    return (
      <div className="ArticleList">
        <div className="articles">{articles}</div>
        <button id="create-article-button" onClick={this.onClickCreate()}>
          Create Article
        </button>
      </div>
    );
  }
  onClickCreate = () => {
    // TODO move on to create page
  };
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
