import React from "react";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import {
  FormText,
  FormInput,
  Container,
  LinkBtn,
  Button,
} from "../../components";
import { Navbar } from "../../components/common";

const AddQuiz = () => {
  const validation = Yup.object({
    question: Yup.string()
      .min(2, "Must be 2 character")
      .max(500, "Must be 500 characters or less")
      .required("Required"),
    option1: Yup.string()
      .required("Required")
      .min(4, "Must be 4 character")
      .max(70, "Must be 50 characters or less"),
    option2: Yup.string()
      .required("Required")
      .min(4, "Must be 4 character")
      .max(70, "Must be 50 characters or less"),
    option3: Yup.string()
      .required("Required")
      .min(4, "Must be 4 character")
      .max(70, "Must be 50 characters or less"),
    option4: Yup.string()
      .required("Required")
      .min(4, "Must be 4 character")
      .max(70, "Must be 50 characters or less"),
  });

  return (
    <>
      <Navbar heading="Entry Quiz" backbtn={true} />
      <div className="enter-quiz">
        <Container className="extra-small">
          <div className="enter-quiz-heading">
            <h1>Q1.</h1>
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
              console.log(values);
              resetForm({ values: "" });
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
                <FormInput place="Option 1" name="option1" type="number" />
                <FormInput place="Option 2" name="option2" type="text" />
                <FormInput place="Option 3" name="option3" type="text" />
                <FormInput place="Option 4" name="option4" type="text" />
                <Button className="btn-lighter rounded center m-2">
                  Add a Question
                </Button>
                {/* <LinkBtn
                  to="/assessments/detail/levels"
                  className="btn-lighter rounded center m-5"
                >
                  Add a Question
                </LinkBtn> */}
              </Form>
            )}
          </Formik>
        </Container>
      </div>
    </>
  );
};

export default AddQuiz;
