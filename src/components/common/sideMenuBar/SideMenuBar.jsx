import { useState, useEffect } from "react";
import "./SideMenuBar.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { VscMenu } from "react-icons/vsc";
import { profile } from "./../../../assests";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, clearErrors, clearMessages } from "./../../../store/actions";

const SideMenuBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setactive] = useState(window.location.pathname);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { logOutMessage, logOutErrors, logOutLoading } = useSelector(
    (state) => state.authReducer
  );
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (logOutErrors.length > 0) {
      toast.error(logOutErrors);
      dispatch(clearErrors());
    }
    if (logOutMessage != "") {
      toast.success(logOutMessage);
      dispatch(clearMessages());
      setTimeout(() => navigate("/"), 2000);
    }
  }, [logOutErrors, logOutMessage]);
  return (
    <>
      <div className="sidebar">
        <motion.div
          animate={{
            width: isOpen ? "220px" : "45px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
        >
          <div className="sidebar-container">
            <div className="sidebar-container-name align-item-center">
              <div className="sidebar-container-name-icon align-item-center">
                <VscMenu onClick={toggle} style={{ cursor: "pointer" }} />
              </div>
              <div className="sidebar-container-name-user align-item-center">
                {isOpen ? (
                  <div className="profile-for-sidebar">
                    <img src={profile} alt="" />
                    <h6>Alex</h6>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="sidebar-container-menu">
              <div className="sidebar-container-menu-list">
                {props.routes.map((item) => {
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      onClick={() => setactive(item.path)}
                    >
                      <div
                        className="sidebar-container-menu-list-link align-item-center"
                        id={active == item.path ? "active" : ""}
                      >
                        <div className="sidebar-container-menu-list-link-icon align-item-center">
                          {item.icon}
                        </div>
                        <div className="sidebar-container-menu-list-link-name align-item-center">
                          {isOpen ? <p>{item.name}</p> : ""}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {isOpen ? (
                <button
                  className="logout-btn-sidebar"
                  onClick={() => dispatch(logOut())}
                >
                  {logOutLoading ? "Please wait..." : "Logout"}
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SideMenuBar;
