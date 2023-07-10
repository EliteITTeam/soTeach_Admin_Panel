import React, { useState, useRef, useEffect } from "react";
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
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateAboutUs,
  CreateBlog,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const BlogPage = () => {
  const imageRef = useRef();
  const blogImageRef = useRef();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState("");
  const navigate = useNavigate();
  const validation = Yup.object({
    description: Yup.string().required("Required"),
  });
  const blogValidation = Yup.object({
    content: Yup.string().required("Required"),
  });
  const dispatch = useDispatch();
  const { message, errors, aboutLoading, blogLoading, sessionExpireError } =
    useSelector((state) => state.assessmentReducer);

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
    }
  }, [errors, message, sessionExpireError]);

  const onImageChange = (event) => {
    setImage(event.target.files[0]);
    setImageUrl(URL.createObjectURL(event.target.files[0]));
  };
  const blogImageChange = (event) => {
    setBlogImage(event.target.files[0]);
    setBlogImageUrl(URL.createObjectURL(event.target.files[0]));
  };
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
                description: "",
              }}
              validateOnMount
              validationSchema={validation}
              onSubmit={(values, { resetForm }) => {
                const { description } = values;
                let finalResult = new FormData();
                finalResult.append("description", description);
                if (blogImage) {
                  finalResult.append("photoPath", blogImage);
                }
                dispatch(CreateAboutUs(finalResult));
                resetForm({ values: "" });
              }}
            >
              {(formik) => (
                <Form>
                  <FormText
                    place="Add Description (150 words)"
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
                      ref={blogImageRef}
                      onChange={blogImageChange}
                    />
                  </div>
                  <div
                    className="btn-lighter rounded center m-2"
                    onClick={() => blogImageRef.current.click()}
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      padding: "2rem",
                      cursor: "pointer",
                    }}
                  >
                    Upload Image
                  </div>
                  {blogImageUrl && (
                    <img
                      src={blogImageUrl}
                      alt="image"
                      width="100"
                      height="100"
                    />
                  )}
                  <Button className="btn-lighter rounded center m-2">
                    {aboutLoading ? "Please wait..." : "Save"}
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
                content: "",
              }}
              validateOnMount
              validationSchema={blogValidation}
              onSubmit={(values, { resetForm }) => {
                const { content } = values;
                let finalResult = new FormData();
                finalResult.append("content", content);
                if (image) {
                  finalResult.append("photoPath", image);
                }
                dispatch(CreateBlog(finalResult));
                imageRef.current.value = "";
                setImageUrl("");
                resetForm({ values: "" });
              }}
            >
              {(formik) => (
                <Form>
                  <FormInput place="Heading" name="content" type="text" />
                  {/* 
                  <FormText
                    place="Add Description "
                    name="question"
                    type="text"
                    cols="100"
                    rows="10"
                  /> */}
                  <div className=""></div>
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
                  {imageUrl && (
                    <img src={imageUrl} alt="image" width="100" height="100" />
                  )}
                  <Button className="btn-lighter rounded center m-2">
                    {blogLoading ? "Please wait..." : "Save"}
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
