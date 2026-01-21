<<<<<<< HEAD
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './Navbar.module.css';
import { useAuth } from './auth/useAuth';

interface NavbarProps {
    username?: string;
}

export default function Navbar({ username }: NavbarProps) {

    const navigate = useNavigate();

    const {logout, user} = useAuth();

    const logoutHandler = () => {
        logout();
        navigate('/');
    }

    const handleLogout = () => {
        // Add logout logic here
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <h1>Expense Reimbursement Management System</h1>
            <div className={styles.headerRight}>
                <span>Welcome, {username}</span>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
        // <nav className = {styles.navBar}>
        // <Link className = {styles.navItem} to = "/">Home</Link>
        // {user 
        // ? 
        // <button onClick={logoutHandler} className = {styles.navRed}>Log Out</button>
        // :
        // <Link className = {styles.navItem} to = "/login">Log In</Link>
        // }
        // <Link className = {styles.navItem} to = "/register">Register</Link>
        // <Link className = {styles.navItem} to = "/employees">Employees</Link>
        // <Link className = {styles.navItem} to = "/tickets">Tickets</Link>
        // </nav>
    )

=======
import { useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css"

interface NavbarProps {
    username?: string;
}

export default function Navbar({ username }: NavbarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Add logout logic here
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <h1>Expense Reimbursement Management System</h1>
            <div className={styles.headerRight}>
                <span>Welcome, {username}</span>
                <button className={styles.logoutBtn} onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    )
>>>>>>> d4af8a141527fb8e338c953018639ba839afe1c0
}