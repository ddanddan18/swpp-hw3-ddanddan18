import React from "react";

const Tab = (props) => {
  return (
    <div className="TabMenuContainer">
      <button
        className="TabMenu"
        value={1}
        onClick={props.onClick}
        id="write-tab-button"
      >
        Write
      </button>
      <button
        className="TabMenu"
        value={2}
        onClick={props.onClick}
        id="preview-tab-button"
      >
        Preview
      </button>
    </div>
  );
};
export default Tab;
