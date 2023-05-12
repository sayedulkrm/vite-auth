import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext("");

const UserContext = ({ children }) => {
    const [userAuth, setUserAuth] = useState(false);

    useEffect(() => {
        let auth = localStorage.getItem("auth");
        if (auth) {
            setUserAuth(auth);
        }
    }, []);

    return (
        <div>
            <AuthContext.Provider value={{ userAuth, setUserAuth }}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default UserContext;
