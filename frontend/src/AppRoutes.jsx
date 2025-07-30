import React from "react";
import { Route, Routes } from "react-router-dom";

import { LoginPageContainer } from "./pages/AuthPages/LoginPageConatiner";
import SignupPageConatiner from "./pages/AuthPages/SignupPageConatiner";

import HomePage from "./pages/HomePages/HomePage";
import MainLayout from "@/Layouts/MainLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPageContainer />} />
      <Route path="/signup" element={<SignupPageConatiner />} />
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
