import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../layout/UserContext";

const Login = () => {
    const { setUserAuth } = useContext(AuthContext);

    const auth = localStorage.getItem("auth");
    useEffect(() => {
        if (auth) {
            navigate("/profile");
        } else {
            setUserAuth(false);
        }
    }, []);

    const userInitialDetails = {
        email: "",
        password: "",
    };

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [userData, setUserData] = useState(userInitialDetails);
    const [btnText, setbtnText] = useState("Log In");

    const handleShowPasswordClick = (e) => {
        e.preventDefault();

        setShowPassword(!showPassword);
    };

    const formData = (cate, value) => {
        setUserData({
            ...userData,
            [cate]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setbtnText("Please Wait. Logging In... ");

        try {
            const response = await axios.post(
                "http://localhost:4000/login",
                userData
            );

            if (response.status === 200) {
                localStorage.setItem("auth", response.data.token);
                setUserAuth(true);
                navigate("/profile");
            }
            setUserData(userInitialDetails);
        } catch (error) {
            setbtnText("Log In");
        }
    };

    return (
        <div className="register">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Email</label>

                <input
                    required
                    value={userData.email}
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => formData("email", e.target.value)}
                />

                <label>Password</label>

                <input
                    required
                    value={userData.password}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    onChange={(e) => formData("password", e.target.value)}
                />
                <button onClick={(e) => handleShowPasswordClick(e)}>
                    Show Password
                </button>

                <button type="submit">{btnText}</button>
            </form>
        </div>
    );
};

export default Login;
