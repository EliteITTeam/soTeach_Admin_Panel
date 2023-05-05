import React from "react";
import "./Verification.scss";
import { profile } from "../../assests";
import { Container } from "../../components";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/common";

const Verification = () => {
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
              <VerificationBar
                name="Alex"
                username="alex4324"
                gender="female"
                age="17"
                dateofbirth="10-03-2005"
                subjects="Eng , Math , Phy"
                status="Requested"
              />
              <VerificationBar
                name="Alex"
                username="alex4324"
                gender="female"
                age="17"
                dateofbirth="10-03-2005"
                subjects="Eng , Math , Phy"
                status="Requested"
              />
              <VerificationBar
                name="Alex"
                username="alex4324"
                gender="female"
                age="17"
                dateofbirth="10-03-2005"
                subjects="Eng , Math , Phy"
                status="Requested"
              />
              <VerificationBar
                name="Alex"
                username="alex4324"
                gender="female"
                age="17"
                dateofbirth="10-03-2005"
                subjects="Eng , Math , Phy"
                status="Requested"
              />{" "}
              <VerificationBar
                name="Alex"
                username="alex4324"
                gender="female"
                age="17"
                dateofbirth="10-03-2005"
                subjects="Eng , Math , Phy"
                status="Requested"
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Verification;

// Sub components
const VerificationBar = (props) => {
  return (
    <>
      <Link to="/verification/1">
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
