import React, { useState } from "react";
import axios from "axios";
import { AuthContext, AuthContextValue, Employee } from "../../types/Employee";
import { useNavigate } from "react-router-dom";
import base_url from "../../util/url";

export default function AuthProvider({children}: {children : React.ReactNode}) {

    const navigate = useNavigate();

    const [user, setUser] = useState<Employee | null> (null);

    const login = async (username:string, password:string) => {

        console.log("username: " + username);
        console.log("passowrd: " + password);
        try {
            let response = await axios.post(`${base_url}/login`, {username, password});
            setUser(response.data);
            navigate('/employees');
        } catch(error) {
            console.error(error);
            alert("Login attempt failed!");
        }
    }

    const logout = () => {
        setUser(null);
    }

    const value: AuthContextValue = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}