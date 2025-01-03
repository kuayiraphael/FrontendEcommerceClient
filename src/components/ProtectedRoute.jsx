// // src/components/ProtectedRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const token =
//     localStorage.getItem("token") || sessionStorage.getItem("token"); // Check for token

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   return children; // If authenticated, render the children (protected route)
// };

// export default ProtectedRoute;
import React from "react";
import { Navigate } from "react-router-dom";

// This component protects routes based on authentication
export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");

  // If the user is not logged in, redirect to the login page
  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
