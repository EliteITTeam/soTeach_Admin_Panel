import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  notePaid,
  bignner,
  lower,
  expert,
  intermediate,
  upper,
} from "../../assests";
import { Container, Grid } from "../../components";
import { Navbar } from "../../components/common";

const AssessmentsDetail = () => {
  const { id } = useParams();
  return (
    <>
      <Navbar heading="Assessments" backbtn={true} />
      <div className="">
        <Container className="md">
          <div className="m-5">
            <Grid className="grid-3">
              <AssessmentDetailCard
                icon={notePaid}
                heading="Enter Quiz"
                text="Basic Level"
                to={`/assessments/detail/viewquiz/${id}`}
              />
              <div></div>
              <div></div>
            </Grid>
            <div className="m-3">
              <Grid className="grid-3">
                <AssessmentDetailCard
                  to={`/assessments/detail/levels/${id}/BEGINNER`}
                  icon={bignner}
                  heading="Beginner"
                  text="Basic Level"
                />
                <AssessmentDetailCard
                  to={`/assessments/detail/levels/${id}/LOWER_INTERMEDIATE`}
                  icon={lower}
                  heading="Lower Intermediate"
                  text="Basic Level"
                />
                <AssessmentDetailCard
                  to={`/assessments/detail/levels/${id}/INTERMEDIATE`}
                  icon={intermediate}
                  heading="Intermediate"
                  text="Basic Level"
                />
                <AssessmentDetailCard
                  to={`/assessments/detail/levels/${id}/UPPER_INTERMEDIATE`}
                  icon={upper}
                  heading="Upper Intermediate"
                  text="Basic Level"
                />
                <AssessmentDetailCard
                  to={`/assessments/detail/levels/${id}/ADVANCED`}
                  icon={expert}
                  heading="Advanced"
                  text="Basic Level"
                />
              </Grid>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AssessmentsDetail;

const AssessmentDetailCard = (props) => {
  return (
    <>
      <Link to={props.to}>
        <div className="assessment-detail-card">
          <div className="assessment-detail-card-container">
            <img src={props.icon} alt="" />
            <h3>{props.heading}</h3>
            <p>{props.text}</p>
            <div className="assessment-detail-card-container-arrow align-item-right m-1">
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
