import { useNavigate } from "react-router-dom";
import { Ticket } from '../../types/Ticket';
import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../util/url";
import styles from "./Tickets.module.css"
import { useAuth } from "../auth/useAuth";


export default function Tickets() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tickets, setTicket] = useState<Ticket[]>([])
    const [filter, setFilter] = useState<'all' | 'pending' | 'date'>('all')

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

    const ticketClickHandler = (id: number) => {
        navigate(`/tickets/${id}`)
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
