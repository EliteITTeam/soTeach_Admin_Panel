import React from "react";
import { profile } from "../../assests";
import { Container } from "../../components";
import { Navbar } from "../../components/common";

const VerificationDetail = () => {
  return (
    <>
      <Navbar heading="Student Verification" backbtn={true} />
      <Container className="lg">
        <div className="verification-detail">
          <div className="verification-detail-btn">
            <button>Approve</button>
            <button>Decline</button>
          </div>
          <div className="verification-detail-container">
            <div className="verification-detail-container-profile">
              <img src={profile} alt="profile" />
              <h3>Alex</h3>
            </div>
            <Container className="lg">
              <div className="verification-detail-container-content m-5">
                <div className="verification-detail-container-content-left">
                  <div className="verification-detail-container-content-left-item">
                    <h5>Username</h5>
                    <p>user name</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Gender</h5>
                    <p>Male</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Age</h5>
                    <p>13</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>DOB</h5>
                    <p>13-12-2002</p>
                  </div>
                  <div className="verification-detail-container-content-left-item">
                    <h5>Dream Job</h5>
                    <p>Pilot</p>
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
