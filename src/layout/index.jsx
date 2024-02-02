import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

function Index() {
  return (
    <div className=" h-full">
      <Header />
      <div className=" h-screen">
        <Outlet />
      </div>
    </div>
  );
}

export default Index;
