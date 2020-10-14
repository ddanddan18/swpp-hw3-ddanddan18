import React, { Component } from "react";
import { connect } from "react-redux";
import Comment from "../../components/Comment/Comment";
import Button from "../../components/Comment/CommentButton";
import * as actionCreators from "../../store/actions/index";

class CommentList extends Component {
  componentDidMount() {
    this.props.onGetComments();
  }
  editHandler = (cmt) => {
    if (this.props.userID !== cmt.author_id) return;
    // prompt input
    const input = prompt("edit your comment", cmt.content);
    // Check new input 1) modify 2) not-modify 3) blank 4) cancle
    // cancle or blank
    if (input === "" || input == null) return;
    // not modify
    if (input === cmt.content) return;
    // modify: edit comment in db
    const editedComment = { ...cmt, content: input };
    this.props.onEditComment(editedComment);
  };
  deleteHandler = (commentID, authorID) => {
    if (this.props.userID !== authorID) return;
    this.props.onDeleteComment(commentID);
  };

  render() {
    const comments = this.props.storedComments.filter((cmt) => {
      // get comments corresponding the article (articleID)
      return cmt.article_id === this.props.articleID;
    });
    const commentsWithButton = comments.map((cmt) => {
      return (
        <div className="Comment" key={cmt.id}>
          <p>------</p>
          <Comment
            authorName={
              this.props.users.find((user) => user.id === cmt.author_id).name
            }
            content={cmt.content}
          />
          <Button
            editHandler={() => this.editHandler(cmt)}
            deleteHandler={() => this.deleteHandler(cmt.id, cmt.author_id)}
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
    onDeleteComment: (id) => dispatch(actionCreators.deleteComment(id)),
    onEditComment: (cmt) => dispatch(actionCreators.editComment(cmt)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CommentList);
