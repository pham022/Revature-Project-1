import { useNavigate, Link } from "react-router-dom";
import styles from "./Navbar.module.css"
import { useAuth } from "./auth/useAuth";

interface NavbarProps {
    username?: string;
}

export default function Navbar({ username }: NavbarProps) {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    const {logout, user} = useAuth();

    return (
        <header className={styles.header}>
            <h1>Expense Reimbursement Management System</h1>
            <div className={styles.headerRight}>
                {user ? (
                <><span>Welcome, {user.username}</span><button className={styles.logoutBtn} onClick={handleLogout}>Log Out</button></>)
                :
                (<span>Please log in.</span>)}

            </div>
        </header>
    )

}