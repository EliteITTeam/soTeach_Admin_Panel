import React from "react";
import "./InfoItem.scss";
const InfoItem = (props) => {
  return (
    <div className="infoitem m-3 ">
      <h6>{props.title}</h6>
      <p className="">{props.content}</p>
    </div>
  );
};

export default InfoItem;
