import React, { useEffect, useState } from "react";
import { profile } from "../../assests";
import { Container } from "../../components";
import { Navbar } from "../../components/common";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  UpdateUserStatus,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const VerificationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo, message, errors, sessionExpireError, loading } =
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
      setTimeout(() => navigate("/verification"), 2000);
    }
  }, [errors, message, sessionExpireError]);
  useEffect(() => {
    dispatch(getUserInfo(id));
  }, []);
  return (
    <>
      <Navbar heading="Student Verification" backbtn={true} />
      <Container className="lg">
        <div className="verification-detail">
          <div className="verification-detail-btn">
            <button
              onClick={() =>
                dispatch(UpdateUserStatus({ status: "accept" }, id))
              }
            >
              {loading ? "Please wait.." : "Approve"}
            </button>
            <button
              onClick={() =>
                dispatch(UpdateUserStatus({ status: "reject" }, id))
              }
            >
              Decline
            </button>
          </div>
          <div className="verification-detail-container">
            <div className="verification-detail-container-profile">
              <img
                crossOrigin="true"
                src={userInfo.photoPath ? userInfo.photoPath : profile}
                alt="profile"
              />
              <h3>{userInfo.firstName && userInfo.firstName}</h3>
            </div>
            <Container className="lg">
              <div className="verification-detail-container-content m-5">
                <div className="verification-detail-container-content-left">
                  <div className="verification-detail-container-content-left-item">
                    <h5>Username</h5>
                    <p>{userInfo.userName && userInfo.userName}</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Gender</h5>
                    <p>{userInfo.gender && userInfo.gender}</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Age</h5>
                    <p>13</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>DOB</h5>
                    <p>{userInfo.dateOfBirth && userInfo.dateOfBirth}</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Dream Job</h5>
                    <p>{userInfo.dreamJob && userInfo.dreamJob}</p>
                  </div>
                </div>
                <div className="verification-detail-container-content-right">
                  <h4>Subjects</h4>
                  <div className="verification-detail-container-content-right-subjects">
                    <p>English</p>
                    <p>Math</p>
                    <p>History</p>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </div>
      </Container>
    </>
  );
};

export default VerificationDetail;
