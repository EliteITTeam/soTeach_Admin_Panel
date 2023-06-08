import React, { useEffect, useRef, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { HiArrowRight } from "react-icons/hi";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, FormInput, FormText, Button, Grid } from "../../components";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetLesson,
  UpdateUnit,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Units = () => {
  const imageRef = useRef();
  const navigate = useNavigate();
  const { id, unitId, heading, unitName } = useParams();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const { records, errors, sessionExpireError, message, loading } = useSelector(
    (state) => state.assessmentReducer
  );
  const validation = Yup.object({
    name: Yup.string().required("Required"),
    description: Yup.string().optional(),
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
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(
        () => navigate(`/assessments/detail/levels/${unitId}/${heading}`),
        2000
      );
    }
  }, [errors, message, sessionExpireError]);

  useEffect(() => {
    dispatch(GetLesson(id));
  }, []);

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Navbar backbtn={true} heading={unitName} />
      <div className="m-5">
        <Container className="extra-small">
          <Formik
            initialValues={{
              name: "",
              description: "",
            }}
            validateOnMount
            validationSchema={validation}
            onSubmit={(values, { resetForm }) => {
              const { name, description } = values;
              let finalResult = new FormData();
              finalResult.append("unitName", name);
              finalResult.append("description", description);
              if (image) {
                finalResult.append("photoPath", image);
              }
              dispatch(UpdateUnit(finalResult, id));
              imageRef.current.value = "";
              resetForm({ values: "" });
            }}
          >
            {(formik) => (
              <Form>
                <FormInput label="Unit Name" name="name" type="text" />

                <FormText
                  label="Description"
                  name="description"
                  type="text"
                  cols="100"
                  rows="10"
                />
                <div style={{ display: "none" }}>
                  <input
                    type="file"
                    name="myImage"
                    accept="image/*"
                    ref={imageRef}
                    onChange={onImageChange}
                  />
                </div>
                <div
                  className="btn-lighter rounded center m-2"
                  onClick={() => imageRef.current.click()}
                  style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "2rem",
                    cursor: "pointer",
                  }}
                >
                  Upload Image
                </div>
                {imageUrl && <img src={imageUrl} alt="image" />}
                <Button className="btn-lighter rounded center m-2">
                  {loading ? "Please wait..." : "Save"}
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
      <Link
        to={`/assessments/detail/addlesson/${props.lessionId}/${props.name}`}
      >
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
