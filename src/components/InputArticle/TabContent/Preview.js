import React from "react";

const Preview = (props) => {
  return (
    <div className="tabContent" id="preview-tab" hidden={props.value !== props.index}>
      <p id="article-author">Author: {props.author} </p>
      <h1 id="article-title">Title: {props.title}</h1>
      <p id="article-content">Content: {props.content}</p>
    </div>
  );
};
export default Preview;
