import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Navigate } from "react-router-dom";

const StudentProtectedRoute = ({ children }) => {
  const { token } = useContext(StoreContext);

  // ✅ Wait until token is checked
  if (token === "") {
    return <p>Checking authentication...</p>;
  }

  if (!token) {
    return <Navigate to="/student-login" replace />;
  }

  return children;
};

export default StudentProtectedRoute;
