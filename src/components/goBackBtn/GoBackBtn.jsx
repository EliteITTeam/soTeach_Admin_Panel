import React from "react";
import "./GoBackBtn.scss";

import { useNavigate } from "react-router-dom";
import { IoCaretBack } from "react-icons/io5";
const GoBackBtn = (props) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className={`back-btn align-item-center ${props.className}`}>
        <IoCaretBack />
        <button onClick={goBack}>Back</button>
      </div>
    </>
  );
};

export default GoBackBtn;
