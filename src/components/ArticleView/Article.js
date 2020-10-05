import React from "react";

const Article = (props) => {
  return (
    <div className="Article">
      <label>{props.id} </label>
      <button id="title" className="title" onClick={props.clickTitle}>
        {props.title}
      </button>
      <label> {props.name}</label>
    </div>
  );
};

export default Article;
