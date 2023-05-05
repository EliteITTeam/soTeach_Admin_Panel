import React from "react";
import "./LinkBtn.scss";

import { Link } from "react-router-dom";

const LinkBtn = (props) => {
  return (
    <>
      <div className={`linkbtn  ${props.className}`}>
        <Link to={props.to}>{props.children}</Link>
      </div>
    </>
  );
};

export default LinkBtn;
