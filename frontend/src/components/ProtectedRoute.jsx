import { useAuthContext } from "@/hooks/Contexts/useAuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to="login" replace />;
  }
  return children;
}

export default ProtectedRoute;
