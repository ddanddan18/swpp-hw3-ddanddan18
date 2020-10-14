import React from "react";
const CommentButton = (props) => {
  return (
    <div className="CommentButton">
      <button
        id="edit-comment-button"
        onClick={props.editHandler}
        hidden={!props.authenticated}
      >
        Edit Commemt
      </button>
      <button
        id="delete-comment-button"
        onClick={props.deleteHandler}
        hidden={!props.authenticated}
      >
        Delete Comment
      </button>
    </div>
  );
};
export default CommentButton;
