import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../footer/Footer";
import { ToastContainer } from "react-toastify";
import Navbar from "../navBar/NavBar";

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
      <ToastContainer />
    </div>
  );
};

export default MainLayout;
