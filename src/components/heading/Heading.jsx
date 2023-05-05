import React from "react";
import "./Heading.scss";

const Heading = (props) => {
  return (
    <>
      <div className={`heading ${props.className}`}>
        <h1>{props.children}</h1>
      </div>
    </>
  );
};

export default Heading;
