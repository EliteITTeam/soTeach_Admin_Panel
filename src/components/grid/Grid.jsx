import React from "react";
import "./Grid.scss";
const Grid = (props) => {
  return (
    <>
      <div className={`grid ${props.className}`}>{props.children}</div>
    </>
  );
};

export default Grid;
