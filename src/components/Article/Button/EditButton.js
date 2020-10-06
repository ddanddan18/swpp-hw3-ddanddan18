import React from "react";

const EditButton = (props) => {
  return (
    <div className="EditButton">
      <button id="back-edit-article-button" onClick={props.backHandler}>
        Back
      </button>
      <button id="confirm-edit-article-button" onClick={props.confirmHandler} disabled={props.isEmpty}>
        Confirm
      </button>
    </div>
  );
};
export default EditButton;
