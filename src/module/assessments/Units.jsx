import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { HiArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Container, FormInput, FormText, Button, Grid } from "../../components";
import { Navbar } from "../../components/common";

const Units = () => {
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
      <Navbar backbtn={true} heading="Unit 1" />
      <div className="m-5">
        <Container className="extra-small">
          <Formik
            initialValues={{
              name: "",
              notice_period: "",
              daysof_availablilty: "",
              guest_limit: "",
              service_area: "",
              about: "",
              service_area: "",
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
                <FormInput label="Unit Name" name="option1" type="number" />

                <FormText
                  label="Description"
                  name="question"
                  type="text"
                  cols="100"
                  rows="10"
                />
                <Button className="btn-lighter rounded center m-2">
                  Upload
                </Button>
              </Form>
            )}
          </Formik>
        </Container>

        <div className="m-5">
          <Container className="lg">
            <Grid className="grid-5">
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
              <LessonCard name="Lesson 1" />
            </Grid>
          </Container>
        </div>
      </div>
    </>
  );
};

export default Units;

const LessonCard = (props) => {
  return (
    <>
      <Link to="/assessments/detail/addlesson">
        <div className="unitscard">
          <div className="unitscard-container">
            <h1>{props.name}</h1>
            <div className="unitscard-container-content">
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
