import React, { useEffect } from "react";
import { Container, Grid } from "../../components";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/common";
import { getExerciseResult } from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
const Exercise = () => {
  const { id, lessonid } = useParams();
  const { userInfo, exerciseResult, userResult } = useSelector(
    (state) => state.userReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExerciseResult(id, lessonid))

  }, [])

  useEffect(() => {
    console.log(exerciseResult);
  }, [exerciseResult])


  return (
    <>
      <Navbar backbtn={true} heading="Lesson 1" />
      <Container className="half">
        <div className="m-6">
          <Grid className="grid-2">
            {exerciseResult.results?.map((item) => (
              <LessonCard name="Exercise 1">
                <p>{item.percentage}%</p>
              </LessonCard>
            ))}


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
