import React from "react";
import { lock } from "../../assests";
import { Container, Button, Grid } from "../../components";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";

const Results = () => {
  return (
    <>
      <Navbar heading="Results" backbtn="true" />
      <Container className="lg">
        <Button className="m-2 align-item-right">Upload Certificate</Button>

        <div className="result-tab-btn   d-flex">
          <Button className="btn-secondry">English</Button>
          <Button className="btn-secondry">Science</Button>
          <Button className="btn-secondry">Math</Button>
          <Button className="btn-secondry">Geography</Button>
        </div>

        <div className="m-6">
          {/* <Units /> */}
          <Grid className="grid-4">
            {/* <Units /> */}
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              {/* <p>34 %</p> */}
              <img src={lock} alt="lock" />
            </UnitsCard>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Results;

const UnitsCard = (props) => {
  return (
    <>
      <Link to="/students/1/results/lesson">
        <div className="unitscard">
          <div className="unitscard-container">
            <h1>{props.name}</h1>
            <div className="unitscard-container-content">
              <div className="unitscard-container-content-main">
                {props.children}
              </div>
              <div className="unitscard-container-content-icon">
                <HiArrowRight />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
