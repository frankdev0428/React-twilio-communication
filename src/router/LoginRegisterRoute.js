import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const LoginRegisterRoute = ({ component: Component, ...rest }) => {
  let user = localStorage.getItem("communicateUser");
  const location = useLocation();

  return user ? (
    <Navigate to={{ pathname: "/", state: { from: location } }} />
  ) : (
    <Outlet />
  );
};

export default LoginRegisterRoute;
