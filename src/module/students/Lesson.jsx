import { lock } from "../../assests";
import { Container, Button, Grid } from "../../components";
import { HiArrowRight } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../../components/common";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLesson
} from "./../../store/actions";

const Lesson = () => {
  const { records } = useSelector((state) => state.assessmentReducer)
  const dispatch = useDispatch();
  const {id, unitid } = useParams();
  useEffect(() => {
    dispatch(GetLesson(unitid))

  }, [])

  useEffect(() => {
    console.log(records);
  }, [records])

  return (
    <>
      <Navbar backbtn={true} heading="Unit 1" />
      <Container className="lg">
        <Button className="m-2 align-item-right">Upload Certificate</Button>
        <div className="m-6">

          <Grid className="grid-5">
            {records?.map(item => (
              <LessonCard name={item.lessonName} id={item.id} userid={id}>
               
              </LessonCard>
            ))}


          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Lesson;

const LessonCard = (props) => {
  const exercise_route="/students/"+props.userid+"/results/lesson/exercise/"+props.id

  return (
    <>
      <Link to={exercise_route}>
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
