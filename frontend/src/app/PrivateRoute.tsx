import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { JSX } from "react";
import { RootState } from "./store";

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
