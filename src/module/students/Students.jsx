import React, { useState, useEffect } from "react";
import "./Students.scss";
import { profile } from "../../assests";
import { Container } from "../../components";
import { Navbar } from "../../components/common";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GetAllUser, clearErrors, clearMessages } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Students = () => {
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
    dispatch(GetAllUser());
  }, []);
  return (
    <>
      <Navbar heading="Student List" />
      <Container className="lg">
        <div className="">
          <div className="studentslist">
            <div className="studentslist-container">
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
                    <h6>Joined on</h6>
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
                      age="17"
                      dateofbirth={data.dateOfBirth && data.dateOfBirth}
                      subjects="Eng , Math , Phy"
                      dateofjoin={data.createdAt && data.createdAt}
                    />
                  );
                })
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Students;

const VerificationBar = (props) => {
  return (
    <>
      <Link to="/students/1">
        <div className="verification-bar m-3">
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
              <h5>{props.dateofjoin}</h5>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
