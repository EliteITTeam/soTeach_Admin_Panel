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
  LogoutUser,
  UpdateLevelOfUser,
  clearErrors,
  clearMessages,
} from "./../../store/actions";

const StudentDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, logoutLoading, message, errors, loading } = useSelector(
    (state) => state.userReducer
  );

  const [modalremove, setModalRemove] = useState(false);
  const [modallogout, setModallogout] = useState(false);
  const [modalupgrade, setModalupgrade] = useState(false);
  const [upgradeValue, setUpgradeValue] = useState("");

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
  let result = { id };

  const handleUpgradeValue = (e) => {
    setUpgradeValue(e.target.value);
  };
  const handleUpgradeSubmit = () => {
    if (upgradeValue) {
      let result = new FormData();
      result.append("level", upgradeValue);
      dispatch(UpdateLevelOfUser(result, id));
    } else {
      toast.error("Upgrade field is required");
    }
  };
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
              <button onClick={() => dispatch(LogoutUser(result))}>
                {logoutLoading ? "Please wait..." : "Logout"}
              </button>
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
            {/* <UpgradeLevelItem
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
            /> */}
            <center>
              <select
                style={{
                  marginTop: "2rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onChange={(e) => handleUpgradeValue(e)}
              >
                <option>Select option for upgrade level</option>
                <option value="BEGINNER">BEGINNER</option>
                <option value="LOWER_INTERMEDIATE">LOWER_INTERMEDIATE</option>
                <option value="INTERMEDIATE">INTERMEDIATE</option>
                <option value="UPPER_INTERMEDIATE">UPPER_INTERMEDIATE</option>
                <option value="ADVANCED">ADVANCED</option>
              </select>
            </center>
            <center>
              <button
                style={{
                  marginTop: "2rem",
                  backgroundColor: "black",
                  color: "white",
                  padding: "1rem",
                  outline: "none",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleUpgradeSubmit()}
              >
                {loading ? "Please wait..." : "UPGRADE LEVEL"}
              </button>
            </center>
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
                src={userInfo?.photoPath ? userInfo.photoPath : profile}
                alt="profile"
              />
              <h3>
                {`${userInfo?.firstName && userInfo.firstName} ${
                  userInfo?.lastName && userInfo.lastName
                }`}
              </h3>
            </div>
            <Container className="lg">
              <div className="student-detail-container-content m-5">
                <div className="student-detail-container-content-left">
                  <div className="student-detail-container-content-left-item">
                    <h5>Username</h5>
                    <p>{userInfo?.userName && userInfo.userName}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Gender</h5>
                    <p>{userInfo?.gender && userInfo.gender}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Age</h5>
                    <p>{userInfo?.age && userInfo.age}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>DOB</h5>
                    <p>
                      {userInfo?.dateOfBirth &&
                        new Date(userInfo.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Dream Job</h5>
                    <p>{userInfo?.dreamJob && userInfo.dreamJob}</p>
                  </div>
                  <div className="student-detail-container-content-left-item">
                    <h5>Joined on</h5>
                    <p>
                      {userInfo.createdAt &&
                        new Date(userInfo.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="student-detail-container-content-right">
                  <div className="student-detail-container-content-right-top">
                    <h4>Subjects</h4>
                    <div className="student-detail-container-content-right-top-subjects">
                      {userInfo?.subjects
                        ? userInfo.subjects.map((item, ind) => {
                            return (
                              <p key={ind}>
                                {item.subject?.name && item.subject.name}
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
                          <h5>{userInfo?.level && userInfo?.level}</h5>
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
      <div
        className="upgradelevel-item m-3"
        onClick={() => prompt("type something...")}
      >
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
