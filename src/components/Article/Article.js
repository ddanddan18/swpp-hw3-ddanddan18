import React from "react";

const Article = (props) => {
  return (
    <div className="Article">
      <div className="id">{props.id}</div>
      <button className="title" onClick={props.clickTitle}>
        {props.title}
      </button>
      <div className="name">{props.name}</div>
    </div>
  );
};

export default Article;
