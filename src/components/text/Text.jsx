import React from "react";
import "./Text.scss";
const Text = (props) => {
  return (
    <>
      <div className={`text ${props.className}`}>
        <p>{props.children}</p>
      </div>
    </>
  );
};

export default Text;
