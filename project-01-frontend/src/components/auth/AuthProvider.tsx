import React, { useState } from "react";
import axios from "axios";
import { AuthContext, AuthContextValue, Employee } from "../../types/Employee";
import { useNavigate } from "react-router-dom";
import base_url from "../../util/url";

export default function AuthProvider({children}: {children : React.ReactNode}) {

    const navigate = useNavigate();

    const [user, setUser] = useState<Employee | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (username:string, password:string) => {

        try {
            let response = await axios.post(`${base_url}/login`, {username, password});
            setUser(response.data);
<<<<<<< HEAD
            // localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/employee');

=======
            localStorage.setItem('user', JSON.stringify(response.data));
            navigate('/employee');
>>>>>>> 0e4419ffd7ab7b0fd82c964e5f97c071b6a75464
        } catch(error) {
            console.error(error);
            alert("Login attempt failed!");
        }
    }

    const register = async (username:string, password:string, isManager:boolean) => {

        try {
            let response = await axios.post(`${base_url}/register`, {username, password, isManager});
            setUser(response.data);
<<<<<<< HEAD
            navigate('/employee');
=======
            navigate('/employees');
>>>>>>> 4a990233a13fee2a2c0594e3abcfee2dc58805ad
        } catch(error) {
            console.error(error);
            alert("Registration attempt failed!");
        }
    }

    const logout = () => {
        setUser(null);
        navigate('/login');
        localStorage.removeItem('user');
    }

    const value: AuthContextValue = {
        user,
        login,
        logout,
        register
    }

    return (
        <AuthContext.Provider value = {value}>
            {children}
        </AuthContext.Provider>
    )
}
