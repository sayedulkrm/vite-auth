import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "./UserContext";

const Navbar = () => {
    const { userAuth, setUserAuth } = useContext(AuthContext);

    return (
        <div className="navbar">
            <Link to={"/"}>Home</Link>
            {userAuth ? (
                <>
                    <Link to={"/profile"}>Profile</Link>

                    <Link to={"/logout"}>Logout</Link>
                </>
            ) : (
                <>
                    <Link to={"/register"}>Register</Link>
                    <Link to={"/login"}>Login</Link>
                </>
            )}
        </div>
    );
};

export default Navbar;
