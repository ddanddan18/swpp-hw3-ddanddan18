import React from "react";

const DetailButton = (props) => {
  return (
    <div className="DetailButton">
      <button id="edit-article-button" onClick={props.editHandler} hidden={props.authenticated}>
        Edit Article
      </button>
      <button id="delete-article-button" onClick={props.deleteHandler} hidden={props.authenticated}>
        Detele Article
      </button>
      <button id="back-detail-article-button" onClick={props.backHandler} hidden={false}>
        Back
      </button>
    </div>
  );
};
export default DetailButton;
