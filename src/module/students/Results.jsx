import React, { useEffect, useState, useRef } from "react";
import { lock } from "../../assests";
import { Container, Button, Grid } from "../../components";
import { HiArrowRight } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserInfo,
  UploadCertificationOfUser,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { PDFIMAGE } from "./../../assests";

const Results = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const pdfRef = useRef();
  const [pdf, setPdf] = useState("");
  const dispatch = useDispatch();
  const { userInfo, message, errors, loading, uploadLoading } = useSelector(
    (state) => state.userReducer
  );

  const FileChange = (event) => {
    setPdf(event.target.files[0]);
  };

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

  const handleUploadCertificate = () => {
    let result = new FormData();
    result.append("certificatePath", pdf);
    dispatch(UploadCertificationOfUser(result, id));
  };
  return (
    <>
      <Navbar heading="Results" backbtn="true" />
      <Container className="lg">
        <div style={{ display: "none" }}>
          <input
            type="file"
            name="myImage"
            accept=".pdf"
            ref={pdfRef}
            onChange={(e) => FileChange(e)}
          />
        </div>
        <Button
          className="align-item-right"
          onClick={() => pdfRef.current.click()}
        >
          Upload Certificate
        </Button>
        {pdf ? (
          <div className="align-item-right m-1">
            <img src={PDFIMAGE} alt="pdf image" width="60" height="60" />
            <br />
            <Button className="m-4" onClick={() => handleUploadCertificate()}>
              {uploadLoading ? "Please wait..." : "Save"}
            </Button>
          </div>
        ) : (
          ""
        )}
        <div className="result-tab-btn   d-flex">
          {userInfo.subjects
            ? userInfo.subjects.map((item, ind) => {
                return (
                  <Button className="btn-secondry" key={ind}>
                    {item.subject?.name && item.subject.name}
                  </Button>
                );
              })
            : ""}
        </div>

        <div className="m-6">
          {/* <Units /> */}
          <Grid className="grid-4">
            {/* <Units /> */}
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              <p>34 %</p>
            </UnitsCard>
            <UnitsCard name="Unit 1">
              {/* <p>34 %</p> */}
              <img src={lock} alt="lock" />
            </UnitsCard>
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Results;

const UnitsCard = (props) => {
  return (
    <>
      <Link to="/students/1/results/lesson">
        <div className="unitscard">
          <div className="unitscard-container">
            <h1>{props.name}</h1>
            <div className="unitscard-container-content">
              <div className="unitscard-container-content-main">
                {props.children}
              </div>
              <div className="unitscard-container-content-icon">
                <HiArrowRight />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
