import React, { useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { HiArrowRight } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, FormInput, FormText, Button, Grid } from "../../components";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GetLesson, clearErrors } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Units = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { records, errors, sessionExpireError, loading } = useSelector(
    (state) => state.assessmentReducer
  );
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
  }, [errors, sessionExpireError]);

  useEffect(() => {
    dispatch(GetLesson(id));
  }, []);
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
                    <LessonCard
                      name={data.lessonName}
                      key={ind}
                      lessionId={data.id}
                    />
                  );
                })
              ) : (
                <h1>No record found</h1>
              )}
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
      <Link to={`/assessments/detail/addlesson/${props.lessionId}`}>
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
