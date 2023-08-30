import React, { useState, useRef, useEffect } from "react";
import "./BlogPage.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Navbar } from "../../components/common";
import { Container, FormText, Heading, Button } from "../../components";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CreateAboutUs,
  CreateBlog,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import JoditEditor from "jodit-react";

const BlogPage = () => {
  const imageRef = useRef();
  const editRef = useRef();
  const editdescRef = useRef();
  const editBlogRef = useRef();
  const blogImageRef = useRef();
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [blogImage, setBlogImage] = useState("");
  const [blogImageUrl, setBlogImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [contentPlainText, setContentPlainText] = useState("");
  const [desContent, setDescContent] = useState("");
  const [descContentPlainText, setDescContentPlainText] = useState("");
  const [heading, setHeading] = useState("");

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

  const handleContent = (newContent) => {
    setContent(newContent);
  };

  const handleDescriptionContent = (newContent) => {
    setDescContent(newContent);
  };

  const handleSaveBlog = () => {
    if (!content || !desContent) {
      toast.error("Heading and desc is required");
    } else {
      let finalResult = new FormData();
      finalResult.append("heading", content);
      finalResult.append("content", desContent);
      if (image) {
        finalResult.append("photoPath", image);
      }
      dispatch(CreateBlog(finalResult));
      imageRef.current.value = "";
      setImageUrl("");
      setContent("");
      setDescContent("");
    }
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
                finalResult.append("heading", heading);
                if (!heading) {
                  toast.error("heading is required");
                } else {
                  dispatch(CreateAboutUs(finalResult));
                  resetForm({ values: "" });
                  setHeading("");
                  setBlogImageUrl("");
                }
              }}
            >
              {(formik) => (
                <Form>
                  <label style={{ fontWeight: "bold" }}>Heading</label>
                  <JoditEditor
                    className="heading-editor"
                    ref={editBlogRef}
                    value={heading}
                    onChange={(newContent) => setHeading(newContent)}
                  />
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
                      width="50%"
                      height="50%"
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
              onSubmit={(values) => {}}
            >
              {(formik) => (
                <Form>
                  <label style={{ fontWeight: "bold" }}>Heading</label>
                  <div style={{ margin: "2rem 0rem" }}>
                    <JoditEditor
                      className="heading-editor"
                      ref={editRef}
                      value={content}
                      onChange={(newContent) => handleContent(newContent)}
                    />
                  </div>
                  <label style={{ fontWeight: "bold" }}>Description</label>
                  <div style={{ marginTop: "2rem" }}>
                    <JoditEditor
                      className="desc-editor"
                      ref={editdescRef}
                      value={desContent}
                      onChange={(newContent) =>
                        handleDescriptionContent(newContent)
                      }
                    />
                  </div>
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
                    <img src={imageUrl} alt="image" width="50%" height="50%" />
                  )}
                  <Button
                    className="btn-lighter rounded center m-2"
                    onClick={() => handleSaveBlog()}
                  >
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
