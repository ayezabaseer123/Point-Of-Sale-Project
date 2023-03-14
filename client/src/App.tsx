import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import ResponsiveDrawer from "./Layout/Layout";
import SignUp from "../src/Pages/SignUp";
import Login from "../src/Pages/Login";

function App() {
  const login = useSelector((state: any) => state.loginEvent.login);

  return (
    <>
      {login?._id && <ResponsiveDrawer />}

      <>
        {!login?._id && (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignUp />} />
           <Route path="/employees" element={<Navigate to="/login" />} />
            <Route path="/products" element={<Navigate to="/login" />} />
            <Route path="/invoices" element={<Navigate to="/login" />} />
            <Route path="/addEmployees" element={<Navigate to="/login" />} />
            <Route path="/addProducts" element={<Navigate to="/login" />} />
            <Route path="/customer/invoice" element={<Navigate to="/login" />} />
            <Route path="/cart" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </>
    </>
  );
}

export default App;
