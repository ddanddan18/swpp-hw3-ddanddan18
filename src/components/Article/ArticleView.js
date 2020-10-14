import React from "react";

const ArticleView = (props) => {
  return (
    <div
      className="tabContent"
      id="preview-tab"
      hidden={
        props.value == null || props.index == null
          ? false
          : props.value !== props.index
      }
    >
      <p id="article-author">Author: {props.authorName} </p>
      <h1 id="article-title">Title: {props.title}</h1>
      <p id="article-content">Content: {props.content}</p>
    </div>
  );
};
export default ArticleView;
