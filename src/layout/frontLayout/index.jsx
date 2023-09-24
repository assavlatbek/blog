import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

function Layout() {
  return (
    <>
      <Header />
      <div className="content">
        <div className="empty"></div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
