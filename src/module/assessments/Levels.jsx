import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Container, Grid } from "../../components";
import { Navbar } from "../../components/common";

const Levels = () => {
  return (
    <>
      <Navbar heading="Beginner" backbtn={true} />
      <div className="levels m-5">
        <Container className="md">
          <Grid className="grid-3">
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
            <Item unitname="Unit 1" />
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Levels;

const Item = (props) => {
  return (
    <>
      <Link to="/assessments/detail/units">
        <div className="level-item">
          <div className="level-item-container">
            <div className="level-item-container-content">
              <h2>{props.unitname}</h2>
            </div>
            <div className="level-item-container-arrow">
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
