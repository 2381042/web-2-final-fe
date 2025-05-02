import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
