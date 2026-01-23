import { useParams, useNavigate } from "react-router-dom";
import { Ticket, TicketStatusHistory } from '../../types/Ticket';
import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../../util/url";
import styles from "./Tickets.module.css";

export default function TicketDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [history, setHistory] = useState<TicketStatusHistory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reopenComment, setReopenComment] = useState('');
    const [showReopenForm, setShowReopenForm] = useState(false);

    useEffect(() => {
        if (id) {
            fetchTicket();
            fetchHistory();
        }
    }, [id]);

    const fetchTicket = async () => {
        try {
            const response = await axios.get(`${base_url}/tickets/${id}`);
            setTicket(response.data);
        } catch (err: any) {
            console.error('Error fetching ticket:', err);
            setError('Failed to load ticket details');
        } finally {
            setLoading(false);
        }
    };

    const fetchHistory = async () => {
        try {
            const response = await axios.get(`${base_url}/tickets/${id}/history`);
            setHistory(response.data);
        } catch (err: any) {
            console.error('Error fetching ticket history:', err);
            // If endpoint doesn't exist or ticket has no history, set empty array
            setHistory([]);
        }
    };

    if (loading) {
        return (
            <div className={styles.dashboard}>
                <p>Loading ticket details...</p>
            </div>
        );
    }

    if (error && !ticket) {
        return (
            <div className={styles.dashboard}>
                <p style={{ color: '#ef4444' }}>{error}</p>
                <button onClick={() => navigate(-1)} className={styles.actionBtn}>
                    Go Back
                </button>
            </div>
        );
    }

    if (!ticket) {
        return (
            <div className={styles.dashboard}>
                <p>Ticket not found</p>
                <button onClick={() => navigate(-1)} className={styles.actionBtn}>
                    Go Back
                </button>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <button 
                onClick={() => navigate(-1)} 
                className={styles.actionBtn}
                style={{ marginBottom: '20px' }}
            >
                ← Back
            </button>

            <h2 className={styles.dashboardTitle}>Ticket Details</h2>

            {error && (
                <div style={{
                    color: '#ef4444',
                    marginBottom: '20px',
                    padding: '12px',
                    background: '#fee2e2',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ef4444'
                }}>
                    {error}
                </div>
            )}

            <div className={styles.wrapper} style={{ marginBottom: '24px' }}>
                <div style={{ padding: '24px' }}>
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Ticket ID:</strong> {ticket.id}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Amount:</strong> ${ticket.price.toFixed(2)}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Description:</strong> {ticket.description}
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Status:</strong>{' '}
                        <span className={`${styles.statusBadge} ${styles[ticket.status.toLowerCase()]}`}>
                            {ticket.status}
                        </span>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <strong>Created:</strong> {new Date(ticket.createdAt).toLocaleString()}
                    </div>
                    {ticket.createdBy && (
                        <div style={{ marginBottom: '16px' }}>
                            <strong>Created By:</strong> {ticket.createdBy.username}
                        </div>
                    )}
                </div>
            </div>

            {/* Ticket History Section */}
            <h3 className={styles.dashboardTitle} style={{ fontSize: '1.5rem', marginTop: '32px' }}>
                Ticket History
            </h3>
            {history.length === 0 ? (
                <div className={styles.wrapper}>
                    <div style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                        No history available yet. History will appear here once actions are taken on this ticket.
                    </div>
                </div>
            ) : (
                <div className={styles.wrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Action</th>
                                <th>Employee</th>
                                <th>Manager</th>
                                <th>Amount</th>
                                <th>Comment</th>
                                <th>Timestamp</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((entry) => (
                                <tr key={entry.id}>
                                    <td>
                                        <span className={`${styles.statusBadge} ${styles[entry.action.toLowerCase()] || styles.pending}`}>
                                            {entry.action}
                                        </span>
                                    </td>
                                    <td>{entry.employee.username}</td>
                                    <td>{entry.manager?.username || '-'}</td>
                                    <td>{entry.amount ? `$${entry.amount.toFixed(2)}` : '-'}</td>
                                    <td>{entry.comment || '-'}</td>
                                    <td>{new Date(entry.timestamp).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
