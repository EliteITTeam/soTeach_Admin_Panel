import React, { useEffect } from "react";
import { Container, LinkBtn } from "../../components";
import { Navbar } from "../../components/common";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllQuiz, clearErrors, clearMessages } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const ViewQuiz = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records, message, errors, loading, sessionExpireError } = useSelector(
    (state) => state.assessmentReducer
  );

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (sessionExpireError != "") {
      toast.error(sessionExpireError);
      dispatch(clearErrors());
      setTimeout(() => navigate("/"), 2000);
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [errors, message, sessionExpireError]);

  useEffect(() => {
    dispatch(GetAllQuiz(id));
  }, []);

  return (
    <>
      <Navbar heading="Quiz Question" backbtn={true} />
      <div className="m-3"></div>
      <Container className="md">
        <LinkBtn
          className="align-item-right mt-3"
          to={`/assessments/detail/addquiz/${id}`}
        >
          Enter Quiz
        </LinkBtn>
      </Container>
      <div className="m2">
        <Container className="extra-small">
          <div className="view-quiz-list m-6">
            {loading ? (
              <Puff
                height="60"
                width="60"
                radius="6"
                color="black"
                ariaLabel="loading"
                wrapperStyle
                wrapperClass
              />
            ) : records.length > 0 ? (
              records.map((data, ind) => {
                return (
                  <QuizCard
                    key={ind}
                    questionNo={ind + 1}
                    question={data.question && data.question}
                    option1={data.options && data.options[0]}
                    option2={data.options && data.options[1]}
                    option3={data.options && data.options[2]}
                    option4={data.options && data.options[3]}
                  />
                );
              })
            ) : (
              <h1>No quiz found</h1>
            )}
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
