import React from "react";
import "./CategoryCard.scss";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
const CategoryCard = (props) => {
  return (
    <>
      <Link to="/search">
        <div className="venderCard">
          <div className="venderCard-container">
            <div className="venderCard-container-image">
              <img src={props.image} alt="card-image" />
            </div>
            <div className="venderCard-container-data space-between ">
              <div className="venderCard-container-data-name">
                <p>{props.name}</p>
              </div>
              <div className="venderCard-container-data-arrow">
                <IoIosArrowForward
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CategoryCard;
