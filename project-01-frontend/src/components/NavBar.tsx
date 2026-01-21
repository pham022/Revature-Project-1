<<<<<<< HEAD
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Navbar.module.css';

export default function Navbar() {

    return (
        <nav className = {styles.navBar}>
        <Link className = {styles.navItem} to = "/">Home</Link>
        <Link className = {styles.navItem} to = "/login">Login</Link>
        <Link className = {styles.navItem} to = "/register">Register</Link>
        <Link className = {styles.navItem} to = "/employees">Employees</Link>
        <Link className = {styles.navItem} to = "/tickets">Tickets</Link>
        </nav>
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