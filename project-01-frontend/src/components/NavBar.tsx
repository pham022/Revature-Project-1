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

}