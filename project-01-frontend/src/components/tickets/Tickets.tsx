import { useNavigate, useLocation } from "react-router-dom";
import { Ticket } from '../../types/Ticket';
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import base_url from "../../util/url";
import styles from "./Tickets.module.css"
import { useAuth } from "../auth/useAuth";


export default function Tickets() {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const hasShownSuccess = useRef(false);

    const [tickets, setTicket] = useState<Ticket[]>([])
    const [filter, setFilter] = useState<'all' | 'pending' | 'date'>('all')
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        axios.get(`${base_url}/tickets`)
            .then(response => {
                const employeeTickets = response.data.filter(
                    (ticket: Ticket) => ticket.createdBy.id === user?.id
                );
                setTicket(employeeTickets);
            })
            .catch(error => console.error(error));
    }, [user?.id])

    useEffect(() => {
        // Check if we came from a successful ticket submission
        const state = location.state as { ticketSubmitted?: boolean } | null;
        const searchParams = new URLSearchParams(location.search);
        
        if ((state?.ticketSubmitted || searchParams.get('success') === 'true') && !hasShownSuccess.current) {
            setShowSuccess(true);
            hasShownSuccess.current = true;
            
            // Clear the state and URL parameter immediately
            navigate(location.pathname, { replace: true, state: {} });
            
            // Auto-hide after 3 seconds
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 3000);
            return () => clearTimeout(timer);
        } else if (!state?.ticketSubmitted && !searchParams.get('success')) {
            // Reset the flag when there's no success state
            hasShownSuccess.current = false;
        }
    }, [location, navigate])

    const ticketClickHandler = (id: number) => {
        // Clear any success state when navigating away
        navigate(`/tickets/${id}`, { state: {} });
    }

    const handleSubmitTicket = () => {
        navigate('/tickets/new')
    }

    const filteredTickets = () => {
        let filtered = [...tickets]
        
        if (filter === 'pending') {
            filtered = filtered.filter(ticket => ticket.status === 'PENDING')
        } else if (filter === 'date') {
            filtered = filtered.sort((a, b) => 
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            )
        }
        
        return filtered
    }

    return (
        <>
            {/* Dashboard */}
            <div className={styles.dashboard}>
                <h2 className={styles.dashboardTitle}>Employee Dashboard</h2>

                {/* Filter Bar */}
                <div className={styles.filterBar}>
                    <div className={styles.filters}>
                        <button 
                            className={`${styles.filterBtn} ${filter === 'all' ? styles.active : styles.inactive}`}
                            onClick={() => setFilter('all')}
                        >
                            All Tickets
                        </button>
                        <button 
                            className={`${styles.filterBtn} ${filter === 'pending' ? styles.active : styles.inactive}`}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </button>
                        <button 
                            className={`${styles.filterBtn} ${filter === 'date' ? styles.active : styles.inactive}`}
                            onClick={() => setFilter('date')}
                        >
                            Ordered by Date
                        </button>
                    </div>
                    <button className={styles.submitBtn} onClick={handleSubmitTicket}>
                        Submit New Ticket
                    </button>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className={styles.successMessage}>
                        Ticket submitted successfully!
                    </div>
                )}

                {/* Table */}
                <div className={styles.wrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Status</th>
                                <th>Created</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets().map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className={styles.idCell}>{ticket.id}</td>
                                    <td className={styles.amountCell}>
                                        ${ticket.price.toFixed(2)}
                                    </td>
                                    <td className={styles.descriptionCell}>
                                        {ticket.description}
                                    </td>
                                    <td className={styles.statusCell}>
                                        <span className={`${styles.statusBadge} ${styles[ticket.status.toLowerCase()]}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className={styles.createdAtCell}>
                                        {new Date(ticket.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className={styles.actionsCell}>
                                        <button 
                                            className={styles.actionBtn}
                                            onClick={() => ticketClickHandler(ticket.id)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}