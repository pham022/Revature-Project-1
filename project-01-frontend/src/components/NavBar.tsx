import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useAuth } from "./auth/useAuth";

interface NavbarProps {
    username?: string;
}

export default function Navbar({ username }: NavbarProps) {
    const navigate = useNavigate();

    // const {logout, user} = useAuth();

    const handleLogout = () => {
        // Add logout logic here
        navigate('/login')
    }

    return (
        <header className={styles.header}>
            <h1>Expense Reimbursement Management System</h1>
            <div className={styles.headerRight}>
                <span>Welcome, {username}</span>
                {/* { user ?  */}
                <button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button>
                {/* // :
                // <Link to = "/login">Log In</Link>} */}
            </div>
        </header>
    )

}