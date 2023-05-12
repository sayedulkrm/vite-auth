import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
    let auth = localStorage.getItem("auth");
    const [user, setUser] = useState({});

    const checkProfile = async () => {
        try {
            const response = await axios.get("http://localhost:4000/profile", {
                headers: {
                    Authorization: auth,
                },
            });
            const data = await response.data;
            setUser(data);
        } catch (error) {
            console.log(error);
        }
    };

    const { name, email } = user;

    useEffect(() => {
        checkProfile();
    }, []);

    return (
        <div>
            <h1>Name: {name}</h1>
            <h2>Email: {email}</h2>
        </div>
    );
};

export default Profile;
