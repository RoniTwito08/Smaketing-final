import React from "react";
import DashboardLayoutBasic from "../sideDrawer/SideDrawer";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <>
      <DashboardLayoutBasic
        branding={null}
        slots={{
          appTitle: () => null,
        }}
      />
      <Outlet />
    </>
  );
};

export default Layout;
