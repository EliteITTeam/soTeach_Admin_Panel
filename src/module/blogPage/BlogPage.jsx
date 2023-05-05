import React from "react";
import "./BlogPage.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { Navbar } from "../../components/common";
import {
  Container,
  FormText,
  FormInput,
  Heading,
  Button,
} from "../../components";
const BlogPage = () => {
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
      <Navbar heading="Blog & About us" />
      <Container className="extra-small">
        <div className="m-5">
          <div className="aboutus-text">
            <Heading className="secondry center">About Us</Heading>
            <p className="center">Add the Content for About Us section</p>
            <Formik
              initialValues={{
                question: "",
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
                    place="Add Description (150 words)"
                    name="question"
                    type="text"
                    cols="100"
                    rows="10"
                  />
                  <Button className="btn-lighter rounded center m-2">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="m-5">
          <div className="blog">
            <Heading className="secondry center">
              Blog (About Afghanistan)
            </Heading>
            <p className="center">Add the Content for Blog section</p>

            <Formik
              initialValues={{
                question: "",
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
                  <FormInput place="Heading" name="option2" type="text" />

                  <FormText
                    place="Add Description "
                    name="question"
                    type="text"
                    cols="100"
                    rows="10"
                  />
                  <div className=""></div>
                  <Button className="btn-lighter rounded center m-2">
                    Save
                  </Button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  );
};

export default BlogPage;
