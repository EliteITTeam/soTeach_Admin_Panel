import React from "react";
import "./Container.scss";

const Container = (props) => {
  return (
    <>
      <div className={`container-${props.className}`}>
        <div className="container-content">{props.children}</div>
      </div>
    </>
  );
};

export default Container;
