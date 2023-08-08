import React, { useState, useEffect } from "react";
import "./PasswordReset.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { profile } from "../../assests";
import { Container, Modal, FormInput, Button } from "../../components";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../../components/common";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
    GetAllUser,
    ResetPassword,
    clearErrors,
    clearMessages,
} from "./../../store/actions";
import { Puff } from "react-loader-spinner";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "@mui/styles";
import { IoIosSearch } from "react-icons/io";

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

const PasswordReset = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const {
        records,
        message,
        errors,
        sessionExpireError,
        loading,
        totalPages,
    } = useSelector((state) => state.userReducer);
    const [searchText, setSearchText] = useState("");

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
        }
    }, [errors, message, sessionExpireError]);

    useEffect(() => {
        dispatch(GetAllUser(true, page));
        setSearchText("");
    }, [page]);
    return (
        <>
            <Navbar heading="Password Reset" />

            {/* style in password reset scss file  */}

            <Container className="lg">
                <div className="searchbar-component">
                    <div className="searchbar-component-input">
                        <IoIosSearch />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                    </div>
                </div>
            </Container>

            <Container className="lg">
                <div className="">
                    <div className="password-list">
                        <div className="password-list-container">
                            <div className="table-like-headings">
                                <div className="table-like-headings-container">
                                    <div className="paddingleft">
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
                                        <h6>Subjects</h6>
                                    </div>
                                    <div>{/* <h6>Status</h6> */}</div>
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
                            ) : records.length > 0 ? (
                                records
                                    .filter((data) =>
                                        (data.firstName + " " + data.lastName)
                                            .toLowerCase()
                                            .startsWith(
                                                searchText.toLowerCase()
                                            )
                                    )
                                    .map((data, ind) => {
                                        return (
                                            <Item
                                                key={ind}
                                                image={
                                                    data.photoPath
                                                        ? data.photoPath
                                                        : profile
                                                }
                                                studentname={`${
                                                    data.firstName &&
                                                    data.firstName
                                                } ${
                                                    data.lastName &&
                                                    data.lastName
                                                }`}
                                                username={
                                                    data.userName &&
                                                    data.userName
                                                }
                                                gender={
                                                    data.gender && data.gender
                                                }
                                                age="18"
                                                subjects="Eng, Math , Phy"
                                                userId={data._id}
                                            />
                                        );
                                    })
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                {records.length > 0 ? (
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

export default PasswordReset;

const Item = (props) => {
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(false);
    const [userId, setUserId] = useState("");
    const passwordvalidation = Yup.object({
        new_password: Yup.string()
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
            )
            .required("Please enter new password.")
            .min(8, "Your password is too short."),
        retypePassword: Yup.string()
            .matches(
                /[a-z]/,
                "Password must contain at least one lowercase letter"
            )
            .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase letter"
            )
            .matches(/[0-9]/, "Password must contain at least one digit")
            .matches(
                /[!@#$%^&*(),.?":{}|<>]/,
                "Password must contain at least one special character"
            )
            .required("Please retype your new password.")
            .oneOf([Yup.ref("new_password")], "Your passwords do not match."),
    });

    return (
        <>
            {alert ? (
                <Modal action={alert}>
                    <div className="passwordreset-modal">
                        <h2 className="center">Reset Password</h2>
                        <Formik
                            initialValues={{
                                new_password: "",
                                retypePassword: "",
                            }}
                            validateOnMount
                            validationSchema={passwordvalidation}
                            onSubmit={(values, { resetForm }) => {
                                const { new_password } = values;
                                let newPassword = { newPassword: new_password };
                                dispatch(ResetPassword(newPassword, userId));
                                resetForm({ values: "" });
                            }}
                        >
                            {(formik) => (
                                <div className="m-5">
                                    <Form>
                                        <FormInput
                                            place="New Password"
                                            name="new_password"
                                            type="password"
                                        />
                                        <FormInput
                                            place="Confirm Password"
                                            name="retypePassword"
                                            type="password"
                                        />
                                        <div className="save-btn">
                                            <Button
                                                disabled={!formik.isValid}
                                                className="btn-lighter rounded center m-2"
                                            >
                                                Save
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            )}
                        </Formik>
                    </div>
                </Modal>
            ) : (
                ""
            )}
            <div className="passwordreset-item m-4">
                <div className="passwordreset-item-container">
                    <img src={props.image} alt="profile" />
                    <div>
                        <p>{props.studentname}</p>
                    </div>
                    <div>
                        <p>{props.username}</p>
                    </div>
                    <div>
                        <p>{props.gender}</p>
                    </div>
                    <div>
                        <p>{props.age}</p>
                    </div>

                    <div>
                        <p>{props.subjects}</p>
                    </div>

                    <div>
                        <button
                            onClick={() => {
                                setAlert(!alert);
                                setUserId(props.userId);
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};
