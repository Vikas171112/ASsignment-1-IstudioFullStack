import Navbar from "@/components/ui/Navbar";
import React from "react";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default MainLayout;
