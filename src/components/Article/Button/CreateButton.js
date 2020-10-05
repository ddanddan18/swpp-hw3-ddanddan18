import React from "react";

const CreateButton = (props) => {
  return (
    <div className="Button" id="button">
      <button id="back-create-article-button" onClick={props.backHandler}>
        Back
      </button>
      <button id="confirm-create-article-button" onClick={props.confirmHandler} disabled={props.isEmpty}>
        Confirm
      </button>
    </div>
  );
};
export default CreateButton;
