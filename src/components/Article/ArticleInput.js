import React from "react";

const ArticleInput = (props) => {
  return (
    <div className="tabContent" id="write-tab" hidden={props.value !== props.index}>
      <label>Title</label>
      <input id="article-title-input" type="text" value={props.title} onChange={props.onChangeTitle} />
      <br />
      <label>Content</label>
      <textarea
        id="article-content-input"
        rows="10"
        type="text"
        value={props.content}
        onChange={props.onChangeContent}
      />
    </div>
  );
};
export default ArticleInput;
