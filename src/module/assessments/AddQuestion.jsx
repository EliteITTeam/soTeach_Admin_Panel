import React, { useState, useEffect } from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormText, FormInput, Container, Button } from "../../components";
import { Navbar } from "../../components/common";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateQuestion,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const AddQuiz = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, errors, loading, sessionExpireError } = useSelector(
    (state) => state.assessmentReducer
  );
  const { id } = useParams();
  const validation = Yup.object({
    question: Yup.string().required("Required"),
    option1: Yup.string().required("Required"),
    option2: Yup.string().required("Required"),
    option3: Yup.string().required("Required"),
    option4: Yup.string().required("Required"),
  });

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

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
      setTimeout(() => navigate(-1), 2000);
    }
  }, [errors, message, sessionExpireError]);

  return (
    <>
      <Navbar heading="Enter Question" backbtn={true} />
      <div className="enter-quiz">
        <Container className="extra-small">
          <div className="enter-quiz-heading">
            <h1>Question</h1>
          </div>
          <Formik
            initialValues={{
              question: "",
              option1: "",
              option2: "",
              option3: "",
              option4: "",
            }}
            validateOnMount
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
              const { question, option1, option2, option3, option4 } = values;
              const result = {
                question,
                options: [option1, option2, option3, option4],
                correctOption: Number(selectedOption),
                exercise: id,
              };
              if (!selectedOption) {
                toast.error("Correct option is required");
              } else {
                dispatch(CreateQuestion(result));
                resetForm({ values: "" });
              }
            }}
          >
            {(formik) => (
              <Form>
                <FormText
                  place="Type a Question"
                  name="question"
                  type="text"
                  cols="100"
                  rows="10"
                />
                <input
                  type="radio"
                  value="0"
                  checked={selectedOption === "0"}
                  onChange={handleOptionChange}
                  style={{ marginTop: "1rem" }}
                />
                <FormInput place="Option 1" name="option1" type="text" />
                <input
                  type="radio"
                  value="1"
                  checked={selectedOption === "1"}
                  onChange={handleOptionChange}
                  style={{ marginTop: "1rem" }}
                />
                <FormInput place="Option 2" name="option2" type="text" />
                <input
                  type="radio"
                  value="2"
                  checked={selectedOption === "2"}
                  onChange={handleOptionChange}
                  style={{ marginTop: "1rem" }}
                />
                <FormInput place="Option 3" name="option3" type="text" />
                <input
                  type="radio"
                  value="3"
                  checked={selectedOption === "3"}
                  onChange={handleOptionChange}
                  style={{ marginTop: "1rem" }}
                />
                <FormInput place="Option 4" name="option4" type="text" />
                <Button className="btn-lighter rounded center m-2">
                  {loading ? "Please wait..." : "Add a Question"}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default AddQuiz;
