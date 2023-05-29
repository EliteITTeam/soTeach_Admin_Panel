import React, { useEffect } from "react";
import "./SignIn.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { FormInput } from "../../components";
import { logo } from "../../assests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Login, clearErrors, clearMessages } from "./../../store/actions";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { message, errors, loading } = useSelector(
    (state) => state.authReducer
  );
  const validate = Yup.object({
    userName: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  }, [errors, message]);
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
                userName: "",
                password: "",
              }}
              validationSchema={validate}
              onSubmit={(values) => {
                dispatch(Login(values));
              }}
            >
              {(formik) => (
                <div className="signin-container-form">
                  <Form>
                    <FormInput place="Email" name="userName" type="text" />
                    <FormInput
                      place="Password"
                      name="password"
                      type="password"
                    />
                    <center>
                      <div className="signin-btn">
                        <button>{loading ? "Please wait..." : "Log In"}</button>
                        {/* <Link to="/dashboard">Log In</Link> */}
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
