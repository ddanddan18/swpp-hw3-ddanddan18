import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Comment from "../../components/Comment/Comment";
import Button from "../../components/Comment/CommentButton";
import * as actionCreators from "../../store/actions/index";

class CommentList extends Component {
  componentDidMount() {
    this.props.onGetComments();
  }
  // TODO edit, deleteHandler 안에서도 authenticated 검사할까?

  render() {
    const comments = this.props.storedComments.filter((cmt) => {
      // get comments corresponding the article (articleID)
      return cmt.article_id === this.props.articleID;
    });
    const commentsWithButton = comments.map((cmt) => {
      return (
        <div className="Comment" key={cmt.id}>
          <p>------</p>
          <Comment authorName={this.props.users.find((user) => user.id === cmt.author_id).name} content={cmt.content} />
          <Button
            editHandler={() => console.log("comment edit")}
            deleteHandler={() => console.log("delete comment")}
            authenticated={cmt.author_id === this.props.userID}
          />
          <p>------</p>
        </div>
      );
    });
    return (
      <div className="CommentList">
        <div className="comments">{commentsWithButton}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    storedComments: state.cmt.comments,
    users: state.user.users,
    userID: state.user.userID,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGetComments: () => dispatch(actionCreators.getComments()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
