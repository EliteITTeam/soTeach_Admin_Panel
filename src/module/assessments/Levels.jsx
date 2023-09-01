import React, { useEffect } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Container, Grid } from "../../components";
import { Navbar } from "../../components/common";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { GetUnit, clearErrors } from "./../../store/actions";
import { Puff } from "react-loader-spinner";

const Levels = () => {
  const navigate = useNavigate();
  const { id, heading } = useParams();
  const dispatch = useDispatch();
  const { records, errors, sessionExpireError, loading } = useSelector(
    (state) => state.assessmentReducer
  );

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
  }, [errors, sessionExpireError]);

  useEffect(() => {
    const result = { subject: id, levelName: heading };
    dispatch(GetUnit(result));
  }, []);
  return (
    <>
      <Navbar
        heading={
          heading === "LOWER_INTERMEDIATE"
            ? "Lower Intermediate"
            : heading === "UPPER_INTERMEDIATE"
            ? "Upper Intermediate"
            : heading === "ADVANCED"
            ? "Advanced"
            : heading === "INTERMEDIATE"
            ? "Intermedidate"
            : heading === "BEGINNER"
            ? "Beginner"
            : ""
        }
        backbtn={true}
      />
      <div className="levels m-5">
        <Container className="md">
          <Grid className="grid-3">
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
                  <Item unitname={data.unitName} key={ind} unitId={data._id} />
                );
              })
            ) : (
              <h1>No unit found</h1>
            )}
          </Grid>
          {loading
            ? ""
            : records.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      marginTop: "3rem",
                      padding: "2rem",
                      outline: "none",
                      border: "none",
                      cursor: "pointer",
                      borderRadius: "4px",
                    }}
                    onClick={() => navigate(`/students/${id}/final/question`)}
                  >
                    Final Exam For Subject
                  </button>
                </div>
              )}
        </Container>
      </div>
    </>
  );
};

export default Levels;

const Item = (props) => {
  const { id, heading } = useParams();
  return (
    <>
      <Link
        to={`/assessments/detail/units/${props.unitId}/${id}/${heading}/${props.unitname}`}
      >
        <div className="level-item">
          <div className="level-item-container">
            <div className="level-item-container-content">
              <h2>{props.unitname}</h2>
            </div>
            <div className="level-item-container-arrow">
              <AiOutlineArrowRight />
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
