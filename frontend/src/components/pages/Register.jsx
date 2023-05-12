import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [btnText, setbtnText] = useState("Register");

    const userInitialDetails = {
        name: "",
        email: "",
        password: "",
    };

    const [userDetails, setUserDetails] = useState(userInitialDetails);

    const formData = (cate, value) => {
        setUserDetails({
            ...userDetails,
            [cate]: value,
        });
    };

    //
    //

    const handleShowPasswordClick = (e) => {
        e.preventDefault();

        setShowPassword(!showPassword);
    };

    //
    //
    //
    //
    // Submitting the form

    const handleSubmit = async (e) => {
        e.preventDefault();
        setbtnText("Registering...");

        try {
            await axios.post("http://localhost:4000/register", userDetails);
            alert("Registered Successfully");
            navigate("/login");
        } catch (error) {
            console.log(error);
            alert(error.response.data.message);
            setbtnText("Register");
        }
    };

    //
    // /
    //
    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    onChange={(e) => formData("name", e.target.value)}
                />

                <label>Email</label>

                <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => formData("email", e.target.value)}
                />

                <label>Password</label>

                <input
                    required
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

export default Register;
