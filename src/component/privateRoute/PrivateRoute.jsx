import React, { useContext } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { authContext } from "../AuthProvider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(authContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-blue-100">
        <p className="text-5xl font-semibold text-blue-800">
          Loading<span className="loading loading-dots loading-xl w-12"></span>
        </p>
      </div>
    );
  }

  if (!user) {
    return <Navigate state={{ from: location.pathname }} to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
