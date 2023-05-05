import { lock } from "../../assests";
import { Container, Button, Grid } from "../../components";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";

const Lesson = () => {
  return (
    <>
      <Navbar backbtn={true} heading="Unit 1" />
      <Container className="lg">
        <Button className="m-2 align-item-right">Upload Certificate</Button>
        <div className="m-6">
          {/* <Units /> */}
          <Grid className="grid-5">
            {/* <Units /> */}
            <LessonCard name="Lesson 1">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Lesson 1">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Lesson 1">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Lesson 1">
              <p>34 %</p>
            </LessonCard>
            <LessonCard name="Lesson 1">
              {/* <p>34 %</p> */}
              <img src={lock} alt="lock" />
            </LessonCard>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Lesson;

const LessonCard = (props) => {
  return (
    <>
      <Link to="/students/:id/results/lesson/exercise">
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
