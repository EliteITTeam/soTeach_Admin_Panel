import React from "react";
import "./SignIn.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput, Button } from "../../components";
import { logo } from "../../assests";
import { Link } from "react-router-dom";
const SignIn = () => {
  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <>
      <div className="signin">
        <div className="signin-container">
          <div className="signin-container-logo">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {(formik) => (
                <div className="signin-container-form">
                  <Form>
                    <FormInput place="Email" name="email" type="email" />
                    <FormInput
                      place="Password"
                      name="password"
                      type="password"
                    />
                    <center>
                      <div className="signin-btn">
                        {/* <button>Log In</button> */}
                        <Link to="/dashboard">Log In</Link>
                      </div>
                    </center>
                  </Form>
                </div>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
