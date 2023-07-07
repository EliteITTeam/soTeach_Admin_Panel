import React, { useEffect, useState } from "react";
import "./Events.scss";
import { Container } from "../../components";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { EventList, clearErrors, clearMessages } from "./../../store/actions";
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
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const { eventList, message, errors, loading, totalPages } = useSelector(
    (state) => state.dashboardReducer
  );

  useEffect(() => {
    if (errors.length > 0) {
      toast.error(errors);
      dispatch(clearErrors());
    }
    if (message != "") {
      toast.success(message);
      dispatch(clearMessages());
    }
  }, [errors, message]);

  useEffect(() => {
    dispatch(EventList(page));
  }, [page]);
  return (
    <>
      <Navbar heading="Events List" />
      <Container className="lg">
        <div>
          <div className="verification">
            <div className="verification-container">
              <div className="table-like-headings">
                <div className="table-like-headings-container">
                  <div>
                    <h6>Date</h6>
                  </div>
                  <div>
                    <h6>Description</h6>
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
              ) : eventList.length > 0 ? (
                eventList.map((data, ind) => {
                  return (
                    <VerificationBar
                      key={ind}
                      date={
                        data.date && new Date(data.date).toLocaleDateString()
                      }
                      description={data.description && data.description}
                    />
                  );
                })
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {eventList.length > 0 ? (
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
      <div className="verification-bar m-4">
        <div className="verification-bar-container">
          <div className="verification-bar-container-item">
            <h5>{props.date}</h5>
          </div>
          <div className="verification-bar-container-item">
            <h5>{props.description}</h5>
          </div>
        </div>
      </div>
    </>
  );
};
