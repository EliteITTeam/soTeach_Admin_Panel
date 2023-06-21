import React, { useState, useEffect } from "react";
import {
  bignner,
  expert,
  lower,
  upper,
  intermediate,
  profile,
} from "../../assests";
import { Container, Modal } from "../../components";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  DeleteSingleUser,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const StudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, message, errors, loading } = useSelector(
    (state) => state.userReducer
  );

  console.log("userInfo is", userInfo);
  const [modalremove, setModalRemove] = useState(false);
  const [modallogout, setModallogout] = useState(false);
  const [modalupgrade, setModalupgrade] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
      setTimeout(() => navigate(-1), 2000);
    }
  }, [errors, message]);
  useEffect(() => {
    dispatch(getUserInfo(id));
  }, []);
  return (
    <>
      {modalremove ? (
        <Modal action={modalremove}>
          <div className="modal-accept">
            <h3>Remove Student</h3>
            <p>
              Are you sure you want to remove this student? You will not be able
              to undo this.
            </p>
            <div className="modal-accept-button">
              <button onClick={() => dispatch(DeleteSingleUser(id))}>
                {loading ? "..." : "Remove"}
              </button>
              <button
                onClick={() => {
                  setModalRemove(!modalremove);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {modallogout ? (
        <Modal action={modallogout}>
          <div className="modal-accept">
            <h3>Logout Student</h3>
            <p>Are you sure you want to Logout this student? </p>
            <div className="modal-accept-button">
              <button>Logout</button>
              <button
                onClick={() => {
                  setModallogout(!modallogout);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      ) : (
        ""
      )}

      {modalupgrade ? (
        <Modal action={modalupgrade}>
          <div className="modal-upgradelevel">
            <h3 className="center">Upgrade Level</h3>
            <UpgradeLevelItem
              image={bignner}
              title="Beginner"
              content="I want to learn the basics of English language"
            />
            <UpgradeLevelItem
              image={lower}
              title="Lower Intermediate"
              content="I can already understand and put together written and spoken sentences"
            />
            <UpgradeLevelItem
              image={intermediate}
              title="Intermediate"
              content="I understand complex sentences and can get by when speaking"
            />
            <UpgradeLevelItem
              image={upper}
              title="Upper Intermediate"
              content="I can express myself fluently and can understand almost everything."
            />
            <UpgradeLevelItem
              image={expert}
              title="Advanced"
              content="I am extremely affluent in the spoken and written language and just want to test myself."
            />
          </div>
        </Modal>
      ) : (
        ""
      )}
      <Navbar heading="Student Profile" backbtn={true} />
      <Container className="lg">
        <div className="student-detail">
          <div className="student-detail-btn">
            <Link to={`/students/${id}/results`}>Results</Link>
            <button onClick={() => navigate("/inbox")}>Message</button>
            <button
              onClick={() => {
                setModalRemove(!modalremove);
              }}
            >
              Remove
            </button>
            <button
              onClick={() => {
                setModallogout(!modallogout);
              }}
            >
              Logout
            </button>
          </div>
          <div className="student-detail-container">
            <div className="student-detail-container-profile">
              <img
                src={userInfo.photoPath ? userInfo.photoPath : profile}
                alt="profile"
              />
              <h3>
                {`${userInfo.firstName && userInfo.firstName} ${
                  userInfo.lastName && userInfo.lastName
                }`}
              </h3>
            </div>
            <Container className="lg">
              <div className="student-detail-container-content m-5">
                <div className="student-detail-container-content-left">
                  <div className="student-detail-container-content-left-item">
                    <h5>Username</h5>
                    <p>{userInfo.userName && userInfo.userName}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Gender</h5>
                    <p>{userInfo.gender && userInfo.gender}</p>
                  </div>
                  {/* <div className="student-detail-container-content-left-item">
                    <h5>Age</h5>
                    <p></p>
                  </div> */}
                  <div className="student-detail-container-content-left-item">
                    <h5>DOB</h5>
                    <p>{userInfo.dateOfBirth && userInfo.dateOfBirth}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Dream Job</h5>
                    <p>{userInfo.dreamJob && userInfo.dreamJob}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Joined on</h5>
                    <p>15-04-23</p>
                  </div>
                </div>
                <div className="student-detail-container-content-right">
                  <div className="student-detail-container-content-right-top">
                    <h4>Subjects</h4>
                    <div className="student-detail-container-content-right-top-subjects">
                      {userInfo.subjects
                        ? userInfo.subjects.map((item, ind) => {
                            return (
                              <p key={ind}>
                                {item.subject.name && item.subject.name}
                              </p>
                            );
                          })
                        : ""}
                    </div>
                  </div>
                  <div className="student-detail-container-content-right-bottom">
                    <h4>Level</h4>
                    <div className="student-detail-container-content-right-bottom-subjects">
                      <div className="student-level-box">
                        <img src={intermediate} alt="levels" />
                        <div className="student-level-box-container">
                          <h5>{userInfo.level && userInfo.level}</h5>
                          <p>
                            I can already understand and put together written
                            and spoken sentences
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="upgrade-btn">
                      <button
                        onClick={() => {
                          setModalupgrade(!modalupgrade);
                        }}
                      >
                        Upgrade
                      </button>
                    </div>
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

export default StudentDetail;

const UpgradeLevelItem = (props) => {
  return (
    <>
      <div className="upgradelevel-item m-3">
        <div className="upgradelevel-item-container">
          <div className="upgradelevel-item-container-image">
            <img src={props.image} alt="level" />
          </div>
          <div className="upgradelevel-item-container-content">
            <h4>{props.title}</h4>
            <p>{props.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};
