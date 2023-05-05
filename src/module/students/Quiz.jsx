import { useState } from "react";
import { Button, Container, Modal } from "../../components";
import { Navbar } from "../../components/common";

const Quiz = () => {
  const [alert, setAlert] = useState(false);
  return (
    <>
      {alert ? (
        <Modal action={alert}>
          <div className="modal-accept">
            <h3>Reset Quiz</h3>
            <p>Are you sure you want to Reset this quiz? </p>
            <div className="modal-accept-button">
              <button>Yes</button>
              <button
                onClick={() => {
                  setAlert(!alert);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}
      <Navbar heading="Exercise 1" backbtn={true} />
      <Container className="md">
        <div className="m-6">
          <Button
            className="align-item-right"
            onClick={() => {
              setAlert(!alert);
            }}
          >
            Reset
          </Button>
          <div className="m-4" />
          <Container className="extra-small">
            <QuizQuestion />
            <QuizQuestion />
            <QuizQuestion />
            <QuizQuestion />
          </Container>
        </div>
      </Container>
    </>
  );
};

export default Quiz;

const QuizQuestion = () => {
  return (
    <>
      <div className="question">
        <div className="question-q">
          <h1>Q1. </h1>
        </div>
        <h1> Which of the following is a verb?</h1>
      </div>
      <div className="option-list">
        <div className="option">
          <input type="radio" />
          <p>Apple</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>Apple</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>Apple</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>Apple</p>
        </div>
      </div>
    </>
  );
};
