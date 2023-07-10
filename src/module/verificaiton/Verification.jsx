import React, { useEffect, useState } from "react";
import "./Verification.scss";
import { profile } from "../../assests";
import { Container } from "../../components";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  GetRequestedUser,
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

const Verification = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { records, message, errors, sessionExpireError, loading, totalPages } =
    useSelector((state) => state.userReducer);

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
    dispatch(GetRequestedUser(false, page));
  }, [page]);
  return (
    <>
      <Navbar heading="Verification" />
      <Container className="lg">
        <div>
          <div className="verification">
            <div className="verification-container">
              <div className="table-like-headings">
                <div className="table-like-headings-container">
                  <div>
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
                    <h6>Date of Birth</h6>
                  </div>
                  <div>
                    <h6>Subjects</h6>
                  </div>
                  <div>
                    <h6>Status</h6>
                  </div>
                </div>
              </div>
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
                    <VerificationBar
                      key={ind}
                      name={data.firstName && data.firstName}
                      username={data.userName && data.userName}
                      gender={data.gender && data.gender}
                      age={data.age && data.age}
                      dateofbirth={data.dateOfBirth && data.dateOfBirth}
                      userId={data._id}
                      subjects={
                        data.subjects &&
                        data.subjects.map((obj) => obj.subject?.name).join(", ")
                      }
                      status={data.status && data.status}
                    />
                  );
                })
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
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
              marginTop: "2rem",
            }}
            showFirstButton
            showLastButton
            onChange={(e, value) => setPage(value)}
          />
        ) : (
          ""
        )}
      </Container>
    </>
  );
};

export default Verification;

// Sub components
const VerificationBar = (props) => {
  return (
    <>
      <Link to={`/verification/${props.userId}`}>
        <div className="verification-bar m-4">
          <div className="verification-bar-container">
            <img src={profile} alt="profile" />
            <div className="verification-bar-container-item">
              {/* <p>Student Name</p> */}
              <h5>{props.name}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Username</p> */}
              <h5>{props.username}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Gender</p> */}
              <h5>{props.gender}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Age</p> */}
              <h5>{props.age}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Date of Birth </p> */}
              <h5>{props.dateofbirth}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Subjects</p> */}
              <h5>{props.subjects}</h5>
            </div>
            <div className="verification-bar-container-item">
              {/* <p>Status </p> */}
              <h5>{props.status}</h5>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
