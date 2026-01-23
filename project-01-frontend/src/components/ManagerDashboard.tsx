import { useNavigate } from "react-router-dom";
import { Ticket, UpdateTicketRequest } from '../types/Ticket';
import { useEffect, useState } from "react";
import axios from "axios";
import base_url from "../util/url";
import styles from "./tickets/Tickets.module.css";
import { useAuth } from "./auth/useAuth";

export default function ManagerDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'denied'>('pending');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState<number | null>(null);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ticketId: number, action: 'APPROVE' | 'DENY'} | null>(null);
    const [comment, setComment] = useState('');

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = () => {
        axios.get(`${base_url}/tickets`)
            .then(response => setTickets(response.data))
            .catch(error => {
                console.error('Error fetching tickets:', error);
                setError('Failed to load tickets');
            });
    };

    const openCommentModal = (ticketId: number, action: 'APPROVE' | 'DENY') => {
        setPendingAction({ ticketId, action });
        setComment('');
        setShowCommentModal(true);
        setError('');
    };

    const closeCommentModal = () => {
        setShowCommentModal(false);
        setPendingAction(null);
        setComment('');
        setError('');
    };

    const handleApprove = async () => {
        if (!pendingAction) return;
        
        if (!comment.trim()) {
            setError('Comment is required when approving a ticket');
            return;
        }

        setLoading(pendingAction.ticketId);
        setError('');
        try {
            const updateRequest: UpdateTicketRequest = {
                status: 'APPROVED',
                comment: comment.trim(),
                managerId: user?.id
            };
            await axios.put(`${base_url}/tickets/${pendingAction.ticketId}`, updateRequest);
            setSuccessMessage('Ticket approved successfully!');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage('');
            }, 3000);
            closeCommentModal();
            fetchTickets(); // Refresh the list
        } catch (error: any) {
            console.error('Error approving ticket:', error);
            setError(error.response?.data?.message || 'Failed to approve ticket');
        } finally {
            setLoading(null);
        }
    };

    const handleDeny = async () => {
        if (!pendingAction) return;
        
        if (!comment.trim()) {
            setError('Comment is required when denying a ticket');
            return;
        }

        setLoading(pendingAction.ticketId);
        setError('');
        try {
            const updateRequest: UpdateTicketRequest = {
                status: 'DENIED',
                comment: comment.trim(),
                managerId: user?.id
            };
            await axios.put(`${base_url}/tickets/${pendingAction.ticketId}`, updateRequest);
            setSuccessMessage('Ticket denied successfully!');
            setShowSuccess(true);
            setTimeout(() => {
                setShowSuccess(false);
                setSuccessMessage('');
            }, 3000);
            closeCommentModal();
            fetchTickets(); // Refresh the list
        } catch (error: any) {
            console.error('Error denying ticket:', error);
            setError(error.response?.data?.message || 'Failed to deny ticket');
        } finally {
            setLoading(null);
        }
    };

    const ticketClickHandler = (id: number) => {
        navigate(`/tickets/${id}`);
    };

    const filteredTickets = () => {
        let filtered = [...tickets];
        
        if (filter === 'pending') {
            filtered = filtered.filter(ticket => ticket.status === 'PENDING');
        } else if (filter === 'approved') {
            filtered = filtered.filter(ticket => ticket.status === 'APPROVED');
        } else if (filter === 'denied') {
            filtered = filtered.filter(ticket => ticket.status === 'DENIED');
        }
        
        // Sort by date (newest first)
        filtered.sort((a, b) => 
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        
        return filtered;
    };

    const pendingCount = tickets.filter(t => t.status === 'PENDING').length;
    const approvedCount = tickets.filter(t => t.status === 'APPROVED').length;
    const deniedCount = tickets.filter(t => t.status === 'DENIED').length;

    return (
        <div className={styles.dashboard}>
            <h2 className={styles.dashboardTitle}>Manager Dashboard</h2>

            {/* Statistics */}
            <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px', 
                marginBottom: '24px' 
            }}>
                <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
                }}>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>
                        Pending Tickets
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#fbbf24' }}>
                        {pendingCount}
                    </div>
                </div>
                <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
                }}>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>
                        Approved
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
                        {approvedCount}
                    </div>
                </div>
                <div style={{ 
                    background: 'white', 
                    padding: '20px', 
                    borderRadius: '8px', 
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)' 
                }}>
                    <div style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '8px' }}>
                        Denied
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: '700', color: '#ef4444' }}>
                        {deniedCount}
                    </div>
                </div>
            </div>

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
                        Pending ({pendingCount})
                    </button>
                    <button 
                        className={`${styles.filterBtn} ${filter === 'approved' ? styles.active : styles.inactive}`}
                        onClick={() => setFilter('approved')}
                    >
                        Approved
                    </button>
                    <button 
                        className={`${styles.filterBtn} ${filter === 'denied' ? styles.active : styles.inactive}`}
                        onClick={() => setFilter('denied')}
                    >
                        Denied
                    </button>
                </div>
            </div>

            {/* Success Message */}
            {showSuccess && (
                <div className={styles.successMessage}>
                    {successMessage}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div style={{
                    color: '#ef4444',
                    fontWeight: '500',
                    marginBottom: '20px',
                    padding: '12px',
                    background: '#fee2e2',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ef4444'
                }}>
                    {error}
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
                        {filteredTickets().length === 0 ? (
                            <tr>
                                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                                    No tickets found
                                </td>
                            </tr>
                        ) : (
                            filteredTickets().map((ticket) => (
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
                                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                            {ticket.status === 'PENDING' && (
                                                <>
                                                    <button 
                                                        className={styles.actionBtn}
                                                        onClick={() => openCommentModal(ticket.id, 'APPROVE')}
                                                        disabled={loading === ticket.id}
                                                        style={{
                                                            backgroundColor: '#10b981',
                                                            color: 'white',
                                                            borderColor: '#10b981'
                                                        }}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button 
                                                        className={styles.actionBtn}
                                                        onClick={() => openCommentModal(ticket.id, 'DENY')}
                                                        disabled={loading === ticket.id}
                                                        style={{
                                                            backgroundColor: '#ef4444',
                                                            color: 'white',
                                                            borderColor: '#ef4444'
                                                        }}
                                                    >
                                                        Deny
                                                    </button>
                                                </>
                                            )}
                                            <button 
                                                className={styles.actionBtn}
                                                onClick={() => navigate(`/tickets/${ticket.id}`)}
                                                style={{
                                                    backgroundColor: '#2563eb',
                                                    color: 'white',
                                                    borderColor: '#2563eb'
                                                }}
                                            >
                                                View History
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Comment Modal */}
            {showCommentModal && pendingAction && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000
                }}>
                    <div style={{
                        background: 'white',
                        borderRadius: '12px',
                        padding: '24px',
                        maxWidth: '500px',
                        width: '90%',
                        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
                    }}>
                        <h3 style={{ marginTop: 0, marginBottom: '16px' }}>
                            {pendingAction.action === 'APPROVE' ? 'Approve Ticket' : 'Deny Ticket'}
                        </h3>
                        <p style={{ color: '#6b7280', marginBottom: '16px', fontSize: '0.875rem' }}>
                            Please provide a comment explaining your decision. This comment is required.
                        </p>
                        
                        {error && (
                            <div style={{
                                color: '#ef4444',
                                marginBottom: '16px',
                                padding: '12px',
                                background: '#fee2e2',
                                borderRadius: '8px',
                                fontSize: '0.875rem'
                            }}>
                                {error}
                            </div>
                        )}

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Enter your comment here..."
                            required
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                padding: '12px',
                                border: '1px solid #d1d5db',
                                borderRadius: '8px',
                                fontSize: '0.875rem',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                marginBottom: '16px'
                            }}
                        />

                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                            <button
                                onClick={closeCommentModal}
                                disabled={loading === pendingAction.ticketId}
                                style={{
                                    padding: '10px 20px',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    background: 'white',
                                    cursor: 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={pendingAction.action === 'APPROVE' ? handleApprove : handleDeny}
                                disabled={loading === pendingAction.ticketId || !comment.trim()}
                                style={{
                                    padding: '10px 20px',
                                    border: 'none',
                                    borderRadius: '8px',
                                    background: pendingAction.action === 'APPROVE' ? '#10b981' : '#ef4444',
                                    color: 'white',
                                    cursor: loading === pendingAction.ticketId || !comment.trim() ? 'not-allowed' : 'pointer',
                                    fontWeight: '500',
                                    opacity: loading === pendingAction.ticketId || !comment.trim() ? 0.6 : 1
                                }}
                            >
                                {loading === pendingAction.ticketId ? 'Processing...' : (pendingAction.action === 'APPROVE' ? 'Approve' : 'Deny')}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
