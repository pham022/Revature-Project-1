import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css';
import { useAuth } from './auth/useAuth';

export default function Navbar() {

    const navigate = useNavigate();

    const {logout, user} = useAuth();

    const logoutHandler = () => {
        logout();
        navigate('/');
    }

    return (
        <nav className = {styles.navBar}>
        <Link className = {styles.navItem} to = "/">Home</Link>
        {user 
        ? 
        <button onClick={logoutHandler} className = {styles.navRed}>Log Out</button>
        :
        <Link className = {styles.navItem} to = "/login">Log In</Link>
        }
        <Link className = {styles.navItem} to = "/register">Register</Link>
        <Link className = {styles.navItem} to = "/employees">Employees</Link>
        <Link className = {styles.navItem} to = "/tickets">Tickets</Link>
        </nav>
    )

}