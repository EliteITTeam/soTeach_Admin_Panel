import React from "react";
import "./PanelLayout.scss";
import { Outlet } from "react-router-dom";
import { Navbar, SideMenuBar } from "../../components/common";
import { adminRoutes } from "../../data/routesData";

const PanelLayout = () => {
  return (
    <>
      <div className="customerdashboardlayout">
        <div className="customerdashboardlayout-container">
          <div className="customerdashboardlayout-container-sidebar">
            <SideMenuBar routes={adminRoutes} />
          </div>
          <div className="customerdashboardlayout-container-content">
            {/* <div className="customerdashboardlayout-container-content-nav">
              <Navbar />
            </div> */}
            <div className="customerdashboardlayout-container-content-outlet">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PanelLayout;
