import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const auth = localStorage.removeItem("auth");

    useEffect(() => {
        if (!auth) {
            navigate("/login");
        }
    }, []);

    return <div>Logout</div>;
};

export default Logout;
