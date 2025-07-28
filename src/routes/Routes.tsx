import { Route, Routes } from "react-router";

import PublicRoute from "./PublicRoutes";
import PrivateRoute from "./PrivateRoutes";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import LoginCallback from "../pages/LoginCallback";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/login-callback"
        element={
          <PublicRoute>
            <LoginCallback />
          </PublicRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
