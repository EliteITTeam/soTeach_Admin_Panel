import React, { useEffect, useState } from "react";
import "./BlogList.scss";
import { Container } from "../../components";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  BlogList,
  DeleteBlogList,
  clearErrors,
  clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import { FiDelete } from "react-icons/fi";

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

const BlogLists = () => {
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
    dispatch(BlogList(page));
  }, [page]);
  return (
    <>
      <Navbar heading="Blogs List" />
      <Container className="lg">
        <div>
          <div className="verification">
            <div className="verification-container">
              <div className="table-like-headings">
                <div className="table-like-headings-container">
                  <div>
                    <h6>Photo</h6>
                  </div>
                  <div>
                    <h6>Heading</h6>
                  </div>
                  <div>
                    <h6>Description</h6>
                  </div>
                  <div>
                    <h6>DELETE</h6>
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
                      image={data?.photoPath && data.photoPath}
                      heading={data?.heading && data.heading}
                      description={data?.content && data.content}
                      blogId={data.id}
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

export default BlogLists;

// Sub components
const VerificationBar = (props) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="verification-bar m-4">
        <div className="verification-bar-container">
          <div className="verification-bar-container-item">
            <img
              crossOrigin="true"
              height={70}
              width={70}
              src={props.image}
              alt="image"
            />
          </div>
          {/* <div dangerouslySetInnerHTML={{ __html: props.heading }} /> */}
          <div className="verification-bar-container-item">
            <h5 dangerouslySetInnerHTML={{ __html: props.heading }} />
          </div>
          <div className="verification-bar-container-item">
            <h5 dangerouslySetInnerHTML={{ __html: props.description }} />
          </div>
          <div className="verification-bar-container-item">
            <FiDelete
              size={40}
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => dispatch(DeleteBlogList(props.blogId))}
            />
          </div>
        </div>
      </div>
    </>
  );
};
