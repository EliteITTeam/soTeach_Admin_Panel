import React, { useState, useEffect } from "react";
import "./Assessments.scss";
import { Container, FormInput, Modal, Button } from "../../components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateSubject,
  GetAllSubject,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiPaginationItem-root": {
      color: "#fff",
      backgroundColor: "#1d1d1d",
      "&:hover": {
        backgroundColor: "white",
        color: "#1d1d1d",
      },
      "& .Mui-selected": {
        backgroundColor: "black",
        color: "white",
      },
    },
  },
});

const Assessments = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { records, message, errors, sessionExpireError, loading, totalPages } =
    useSelector((state) => state.assessmentReducer);

  const [alert, setAlert] = useState(false);
  const passwordvalidation = Yup.object({
    name: Yup.string().required("Subject is required"),
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
    }
  }, [errors, message, sessionExpireError]);

  useEffect(() => {
    dispatch(GetAllSubject(page));
  }, [page]);

  return (
    <>
      {alert ? (
        <Modal action={alert}>
          <div className="passwordreset-modal">
            <h2 className="center">Add Subjects</h2>
            <Formik
              initialValues={{
                name: "",
              }}
              validateOnMount
              validationSchema={passwordvalidation}
              onSubmit={(values, { resetForm }) => {
                dispatch(CreateSubject(values));
                resetForm({ values: "" });
                setAlert(!alert);
              }}
            >
              {(formik) => (
                <div className="m-5">
                  <Form>
                    <FormInput label="Add Subjects" name="name" type="text" />
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
                <Item
                  icon={data.name && data.name.charAt(0).toUpperCase()}
                  subject={data.name && data.name}
                  key={ind}
                  subjectId={data.id && data.id}
                />
              );
            })
          ) : (
            ""
          )}
          {records.length > 0 ? (
            <Pagination
              classes={{ root: classes.root }}
              variant="outlined"
              count={totalPages}
              page={page}
              size="large"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              showFirstButton
              showLastButton
              onChange={(e, value) => setPage(value)}
            />
          ) : (
            ""
          )}
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
      <Link to={`/assessments/detail/${props.subjectId}`}>
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
