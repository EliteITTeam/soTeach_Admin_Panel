import React from "react";
import { Container, Grid } from "../../components";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";
const Exercise = () => {
  return (
    <>
      <Navbar backbtn={true} heading="Lesson 1" />
      <Container className="half">
        <div className="m-6">
          <Grid className="grid-2">
            <LessonCard name="Exercise 1">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Exercise 2">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Exercise 3">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Exercise 4">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Exercise 5">
              <p>34 %</p>
            </LessonCard>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Exercise;

const LessonCard = (props) => {
  return (
    <>
      <Link to="/students/:id/results/lesson/exercise/quiz">
        <div className="unitscard">
          <div className="unitscard-container">
            <h1>{props.name}</h1>
            <div className="unitscard-container-content">
              <div className="unitscard-container-content-main">
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
