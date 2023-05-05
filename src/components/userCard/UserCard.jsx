import React from "react";
import { Link } from "react-router-dom";
import "./UserCard.scss";
const UserCard = (props) => {
  return (
    <>
      <Link to={props.to}>
        <div className="usercard">
          <div className="usercard-container">
            <img src={props.image} alt="profile" />
            <h5>{props.name}</h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default UserCard;
