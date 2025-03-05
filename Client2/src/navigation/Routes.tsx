import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayoutBasic from "../components/sideDrawer/SideDrawer";
import LandingPage from "../pages/landingPageScreen/LandingPage";
import FormsPage from "../pages/LoginSignupScreen/LoginSignupPage/LoginSignupPage";
import { ProtectedRoute } from "../components/ProtectedRoute";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/forms" element={<FormsPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <DashboardLayoutBasic />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
