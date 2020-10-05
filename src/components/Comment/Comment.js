import React from "react";

const Comment = (props) => {
  return (
    <div className="Comment">
      <p id="author" className="author">
        {props.authorName}
      </p>
      <p id="content" className="content">
        {props.content}
      </p>
    </div>
  );
};

export default Comment;
