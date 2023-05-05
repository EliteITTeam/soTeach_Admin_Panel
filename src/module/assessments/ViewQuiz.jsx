import React from "react";
import { Container, LinkBtn } from "../../components";
import { Navbar } from "../../components/common";

const ViewQuiz = () => {
  return (
    <>
      <Navbar heading="Quiz Question" backbtn={true} />
      <div className="m-3"></div>
      <Container className="md">
        <LinkBtn
          className="align-item-right mt-3"
          to="/assessments/detail/addquiz"
        >
          Enter Quiz
        </LinkBtn>
      </Container>
      <div className="m2">
        <Container className="extra-small">
          <div className="view-quiz-list m-6">
            <QuizCard
              questionNo="1"
              question="Which of the following is a verb?"
              option1="Apple"
              option2="Run"
              option3="The"
              option4="Table"
            />
            <QuizCard
              questionNo="1"
              question="Which of the following is a verb?"
              option1="Apple"
              option2="Run"
              option3="The"
              option4="Table"
            />{" "}
            <QuizCard
              questionNo="1"
              question="Which of the following is a verb?"
              option1="Apple"
              option2="Run"
              option3="The"
              option4="Table"
            />{" "}
            <QuizCard
              questionNo="1"
              question="Which of the following is a verb?"
              option1="Apple"
              option2="Run"
              option3="The"
              option4="Table"
            />{" "}
            <QuizCard
              questionNo="1"
              question="Which of the following is a verb?"
              option1="Apple"
              option2="Run"
              option3="The"
              option4="Table"
            />
          </div>
        </Container>
      </div>
    </>
  );
};

export default ViewQuiz;

const QuizCard = (props) => {
  return (
    <>
      <div className="quizcard">
        <div className="quizcard-container">
          <h1>
            <span>Q {props.questionNo}: </span> {props.question}
          </h1>
          <p>
            <span>1)</span>
            {props.option1}
          </p>
          <p>
            <span>2)</span>
            {props.option2}
          </p>
          <p>
            <span>3)</span>
            {props.option3}
          </p>
          <p>
            <span>4)</span>
            {props.option4}
          </p>
        </div>
      </div>
    </>
  );
};
