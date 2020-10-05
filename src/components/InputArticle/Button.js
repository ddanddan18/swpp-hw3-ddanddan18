import React from "react";

const Button = (props) => {
  return (
    <div className="Button" id="button">
      <button id="back-create-article-button" onClick={() => console.log("back")}>
        Back
      </button>
      <button id="confirm-create-article-button" onClick={() => console.log("confirm")}>
        Confirm
      </button>
    </div>
  );
};
export default Button;
