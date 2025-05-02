import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const PublicRoute = ({ children }: { children: ReactNode }) => {
  return !localStorage.getItem("token") ? children : <Navigate to="/" />;
};

export default PublicRoute;
