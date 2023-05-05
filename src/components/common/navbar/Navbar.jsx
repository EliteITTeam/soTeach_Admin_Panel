import React, { useState } from "react";
import Heading from "../../heading/Heading";
import "./Navbar.scss";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";

const Navbar = (props) => {
  const [show, setshow] = useState(props.backbtn);
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="navbar-container-backicon">
          {show ? <HiOutlineArrowLeft onClick={goBack} /> : ""}
        </div>
        <h2>{props.heading}</h2>
        <div></div>
      </div>
    </div>
  );
};

export default Navbar;
