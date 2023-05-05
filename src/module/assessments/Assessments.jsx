import React, { useState } from "react";
import "./Assessments.scss";
import {
  Container,
  FormInput,
  FormText,
  Modal,
  Button,
} from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";
const Assessments = () => {
  const [alert, setAlert] = useState(false);
  const passwordvalidation = Yup.object({
    new_password: Yup.string()
      .required("Please enter new password.")
      .min(8, "Your password is too short."),
    retypePassword: Yup.string()
      .required("Please retype your new password.")
      .oneOf([Yup.ref("new_password")], "Your passwords do not match."),
  });
  return (
    <>
      {alert ? (
        <Modal action={alert}>
          <div className="passwordreset-modal">
            <h2 className="center">Add Subjects</h2>
            <Formik
              initialValues={{
                new_password: "",
                retypePassword: "",
              }}
              validateOnMount
              validationSchema={passwordvalidation}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                resetForm({ values: "" });
              }}
            >
              {(formik) => (
                <div className="m-5">
                  <Form>
                    <FormInput
                      label="Add Subjects"
                      name="new_password"
                      type="password"
                    />
                    <FormText
                      label={"Description"}
                      name="question"
                      type="text"
                      cols="100"
                      rows="10"
                    />
                    <div className="save-btn">
                      <Button className="btn-lighter rounded center m-2">
                        Confirm
                      </Button>
                    </div>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </Modal>
      ) : (
        ""
      )}

      <Navbar heading="Assessments" />
      <Container className="md">
        <div className="assessment-item">
          <Item icon="E" subject="English" />
          <Item icon="G" subject="Geography" />
          <Item icon="S" subject="Science" />

          <div className="assessment-btn center">
            <button
              className="m-5"
              onClick={() => {
                setAlert(!alert);
              }}
            >
              Add subjects
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Assessments;

const Item = (props) => {
  return (
    <>
      <Link to="/assessments/detail">
        <div className="assessmentcard ">
          <div className="assessmentcard-container">
            <div>
              <h1>{props.icon}</h1>
              <h3>{props.subject}</h3>
            </div>
            <AiOutlineArrowRight />
          </div>
        </div>
      </Link>
    </>
  );
};
