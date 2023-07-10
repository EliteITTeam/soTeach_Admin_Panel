import React, { useEffect } from "react";
import { lock } from "../../assests";
import { Container, Button, Grid } from "../../components";
import { HiArrowRight } from "react-icons/hi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, clearErrors, clearMessages } from "./../../store/actions";

const Results = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userInfo, message, errors, loading } = useSelector(
    (state) => state.userReducer
  );

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
      <Navbar heading="Results" backbtn="true" />
      <Container className="lg">
        <Button className="m-2 align-item-right">Upload Certificate</Button>

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
