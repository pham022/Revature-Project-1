import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateTicketRequest, Ticket } from '../../types/Ticket';
import axios from 'axios';
import base_url from '../../util/url';
import styles from '../Item.module.css';
import { AuthContext, Employee } from '../../types/Employee';

export default function TicketItem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const ctx = useContext(AuthContext);
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        if (!id || id === 'new') {
            setIsCreate(true);
            setTicket({
                id: 0,
                description: '',
                price: 0,
                status: "PENDING",
                createdBy: {} as Employee,
                createdAt: new Date().toISOString()
            });
        } else {
            axios.get(`${base_url}/tickets/${id}`)
                .then(response => setTicket(response.data))
                .catch(error => console.error(error));
        }
    }, [id]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (!ticket) return;
        
        setTicket({
            ...ticket,
            [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
        });
    };

    const onCreateHandler = () => {
        if (!ticket) return;

        
        if (!ticket.description || ticket.description.trim() === '') {
            alert('Description is required');
            return;
        }
        
        if (ticket.price <= 0) {
            alert('Amount must be greater than $0');
            return;
        }

        if (!ctx?.user?.id) {
            navigate('/login');
            return;
        }

        const requestBody: CreateTicketRequest = {
            price: ticket.price,
            description: ticket.description,
            createdById: ctx.user.id
        }

        axios.post(`${base_url}/tickets`, requestBody)
            .then(response => {
                alert('Ticket created successfully!');
                navigate('/employee');
            })
            .catch(error => {
                console.error('Error creating ticket:', error);
                alert('Failed to create ticket');
            });
    };

    const onUpdateHandler = () => {
        if (!ticket?.id) {
            console.error('ticket id is null');
            return;
        }
        
        axios.put(`${base_url}/tickets/${ticket.id}`, ticket)
            .then(response => {
                alert('Ticket updated successfully!');
                navigate('/employee');
            })
            .catch(error => {
                console.error('Error updating ticket:', error);
                alert('Failed to update ticket');
            });
    };

    const onDeleteHandler = () => {
        if (!ticket?.id) {
            console.error('ticket id is null');
            return;
        }
        
        if (window.confirm('Are you sure you want to delete this ticket?')) {
            axios.delete(`${base_url}/tickets/${ticket.id}`)
                .then(response => {
                    alert('Ticket deleted!');
                    navigate('/employee');
                })
                .catch(error => {
                    console.error('Error deleting ticket:', error);
                    alert('Failed to delete ticket');
                });
        }
    };

return ticket ? (
    <div className={styles.wrapper}>
        <h2 className={styles.title}>
            {isCreate ? 'Create New Ticket' : 'Edit Ticket'}
        </h2>

        <form className={styles.form}>
            <div className={styles.field}>
                <label className={styles.label} htmlFor="description">
                    Description
                </label>
                <input
                    id="description"
                    className={styles.input}
                    onChange={onChangeHandler}
                    name="description"
                    value={ticket.description}
                    required
                />
            </div>

            <div className={styles.field}>
                <label className={styles.label} htmlFor="price">
                    Amount ($)
                </label>
                <input
                    id="price"
                    className={styles.input}
                    onChange={onChangeHandler}
                    name="price"
                    type="number"
                    step="0.01"
                    value={ticket.price}
                    required
                />
            </div>

            <div className={styles.actions}>
                {isCreate ? (
                    // Create mode
                    <>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.primary}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onCreateHandler();
                            }}
                        >
                            Create Ticket
                        </button>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={() => navigate('/employee')}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    // Edit mode
                    <>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.primary}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onUpdateHandler();
                            }}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className={`${styles.button} ${styles.danger}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onDeleteHandler();
                            }}
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </form>
    </div>
) : (
    <h1 className={styles.loading}>Loading...</h1>
);
}