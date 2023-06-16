import { useState, useEffect } from "react";
import { Button, Container, Modal } from "../../components";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GetUnitQuestion,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
      backgroundColor: "#1d1d1d",
      "&:hover": {
        backgroundColor: "white",
        color: "#1d1d1d",
      },
      "& .Mui-selected": {
        backgroundColor: "black",
        color: "white",
      },
    },
  },
});
const UnitQuestion = () => {
  const classes = useStyles();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { records, message, errors, loading, sessionExpireError, totalPages } =
    useSelector((state) => state.assessmentReducer);
  const [alert, setAlert] = useState(false);

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
    dispatch(GetUnitQuestion(id, page));
  }, [page]);
  return (
    <>
      <Navbar heading="Questions" backbtn={true} />
      <Container className="md">
        <div className="m-6">
          <Button
            className="align-item-right"
            onClick={() => navigate(`/students/${id}/CreateUnit/question`)}
          >
            Add New Question
          </Button>
          <div className="m-4" />
          <Container className="extra-small">
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
                  <QuizQuestion
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
              <h1>No question found</h1>
            )}
          </Container>
          {records.length > 0 ? (
            <Pagination
              classes={{ root: classes.root }}
              variant="outlined"
              count={totalPages}
              page={page}
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "4rem",
              }}
              showFirstButton
              showLastButton
              onChange={(e, value) => setPage(value)}
            />
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
};

export default UnitQuestion;

const QuizQuestion = (props) => {
  return (
    <>
      <div className="question">
        <div className="question-q">
          <h1>Q{props.questionNo}. </h1>
        </div>
        <h1>{props.question}</h1>
      </div>
      <div className="option-list">
        <div className="option">
          <input type="radio" />
          <p>{props.option1}</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>{props.option2}</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>{props.option3}</p>
        </div>
        <div className="option">
          <input type="radio" />
          <p>{props.option4}</p>
        </div>
      </div>
    </>
  );
};
