import React, { Component } from "react";
import { connect } from "react-redux";
import Input from "../../components/Article/ArticleInput";
import Preview from "../../components/Article/ArticleView";
import Tab from "../../components/Article/Tab/Tab";
import Button from "../../components/Article/Button/CreateButton";
import * as actionCreators from "../../store/actions/index";

class NewComment extends Component {
  state = {
    comment: "",
  };

  postCommentHandler = () => {
    this.props.onStoreComment(this.props.userID, this.props.articleID, this.state.comment);
  };
  render() {
    return (
      <div className="NewComment">
        <label>Comment</label>
        <textarea
          id="new-comment-content-input"
          rows="2"
          type="text"
          value={this.state.comment}
          onChange={(event) => this.setState({ comment: event.target.value })}
        />
        <button
          id="confirm-create-comment-button"
          onClick={() => this.postCommentHandler()}
          disabled={this.state.comment === ""}
        >
          Confirm Comment
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userID: state.user.userID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStoreComment: (userID, articleID, comment) =>
      dispatch(actionCreators.postComment({ author_id: userID, article_id: articleID, content: comment })),
    // TODO postComment 만들기
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewComment);
