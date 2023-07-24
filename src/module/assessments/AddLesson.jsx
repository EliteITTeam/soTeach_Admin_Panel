import React, { useRef, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Container, FormInput, FormText, Button, Grid } from "../../components";
import { Navbar } from "../../components/common";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiArrowRight } from "react-icons/hi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetExercise,
  UpdateLesson,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { PDFIMAGE } from "./../../assests";

const AddLesson = () => {
  const { id, heading } = useParams();
  const navigate = useNavigate();
  const imageRef = useRef();
  const pdfRef = useRef();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [pdf, setPdf] = useState("");
  const dispatch = useDispatch();
  const { records, errors, sessionExpireError, message, loading } = useSelector(
    (state) => state.assessmentReducer
  );
  const validation = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
  });

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };
  const FileChange = (event) => {
    setPdf(event.target.files[0]);
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

  useEffect(() => {
    dispatch(GetExercise(id));
  }, []);

  return (
    <>
      <Navbar backbtn={true} heading={heading} />
      <div style={{ display: "none" }}>
        <input
          type="file"
          name="myImage"
          accept=".pdf"
          ref={pdfRef}
          onChange={(e) => FileChange(e)}
        />
      </div>
      <div className="m-4">
        <Container className="md">
          <Button
            className="btn-primary align-item-right"
            onClick={() => pdfRef.current.click()}
          >
            Upload pdf
          </Button>
          {pdf ? (
            <div className="align-item-right m-1">
              <img src={PDFIMAGE} alt="pdf image" width="60" height="60" />
            </div>
          ) : (
            ""
          )}
        </Container>
      </div>
      <div className="m-5">
        <Container className="extra-small">
          <Container className="md">
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
                finalResult.append("lessonName", name);
                finalResult.append("description", description);
                if (image) {
                  finalResult.append("videoPath", image);
                }
                if (pdf) {
                  finalResult.append("lessonPDFpath", pdf);
                }
                dispatch(UpdateLesson(finalResult, id));
                resetForm({ values: "" });
              }}
            >
              {(formik) => (
                <Form>
                  <FormInput label="Lesson Name" name="name" type="text" />

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
                      accept="video/*"
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
                    Upload Video Content
                  </div>
                  {imageUrl && (
                    <video width="320" height="240" controls>
                      <source src={imageUrl} type="video/mp4" />{" "}
                    </video>
                  )}
                  <Button className="btn-lighter rounded center m-2">
                    {loading ? "Please wait..." : "Save"}
                  </Button>
                </Form>
              )}
            </Formik>
          </Container>

          {/* <div className="uploadvideo">
            <Button className="btn-primary center">Upload Video Content</Button>
          </div> */}

          <div className="m-5">
            <Container className="lg">
              <Grid className="grid-2">
                {records.length > 0 ? (
                  records.map((item, ind) => {
                    return (
                      <ExerciseCard
                        name={item.name}
                        exerciseId={item.id}
                        key={ind}
                      />
                    );
                  })
                ) : (
                  <h1>No Exercise found</h1>
                )}
              </Grid>
            </Container>
          </div>
          {/* <div>
            <Button className="center btn-secondry">Save & Return</Button>
          </div> */}
        </Container>
      </div>
    </>
  );
};

export default AddLesson;

const ExerciseCard = (props) => {
  return (
    <>
      <Link to={`/students/${props.exerciseId}/results/lesson/exercise/quiz`}>
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
