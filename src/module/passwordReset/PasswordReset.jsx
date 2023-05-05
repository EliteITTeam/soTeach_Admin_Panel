import React, { useState } from "react";
import "./PasswordReset.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { profile } from "../../assests";
import { Container, Modal, FormInput, Button } from "../../components";
import { Navbar } from "../../components/common";
const PasswordReset = () => {
  return (
    <>
      <Navbar heading="Password Reset" />
      <Container className="lg">
        <div className="">
          <div className="password-list">
            <div className="password-list-container">
              <div className="table-like-headings">
                <div className="table-like-headings-container">
                  <div className="paddingleft">
                    <h6>Students Name</h6>
                  </div>
                  <div>
                    <h6>Username</h6>
                  </div>
                  <div>
                    <h6>Gender</h6>
                  </div>
                  <div>
                    <h6>Age</h6>
                  </div>

                  <div>
                    <h6>Subjects</h6>
                  </div>
                  <div>{/* <h6>Status</h6> */}</div>
                </div>
              </div>

              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
              <Item
                image={profile}
                studentname="Alex"
                username="alex123"
                gender="female"
                age="18"
                subjects="Eng, Math , Phy"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PasswordReset;

const Item = (props) => {
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
            <h2 className="center">Reset Password</h2>
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
                      place="New Password"
                      name="new_password"
                      type="password"
                    />
                    <FormInput
                      place="Confirm Password"
                      name="retypePassword"
                      type="password"
                    />
                    <div className="save-btn">
                      <Button
                        disabled={!formik.isValid}
                        className="btn-lighter rounded center m-2"
                      >
                        Save
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
      <div className="passwordreset-item m-4">
        <div className="passwordreset-item-container">
          <img src={props.image} alt="profile" />
          <div>
            <p>{props.studentname}</p>
          </div>
          <div>
            <p>{props.username}</p>
          </div>
          <div>
            <p>{props.gender}</p>
          </div>
          <div>
            <p>{props.age}</p>
          </div>

          <div>
            <p>{props.subjects}</p>
          </div>

          <div>
            <button
              onClick={() => {
                setAlert(!alert);
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
