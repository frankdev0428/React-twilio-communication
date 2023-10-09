import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "components/Header/Header";

const Layout = ({ hideHeaderPaths = [] }) => {
  const { pathname } = useLocation();

  return (
    <>
      {!hideHeaderPaths.includes(pathname) && <Header />}
      <Outlet />
    </>
  );
};

export default Layout;
