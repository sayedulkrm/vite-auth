import React, { useContext } from "react";
import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import Home from "./components/pages/Home";

import Navbar from "./components/layout/Navbar";

import Register from "./components/pages/Register";
import Login from "./components/pages/Login.jsx";
import Logout from "./components/pages/Logout.jsx";
import Profile from "./components/pages/Profile";

import { AuthContext } from "./components/layout/UserContext";
// ALL CSS
import "./App.css";

const PrivetRoute = () => {
    const auth = localStorage.getItem("auth");
    const { userAuth } = useContext(AuthContext);
    return (
        <>{userAuth || auth ? <Outlet /> : <Navigate replace to="/login" />}</>
    );
};

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivetRoute />}>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
