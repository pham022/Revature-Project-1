import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import base_url from "../../util/url";
import styles from "../Item.module.css";
import { DEFAULT_CATEGORIES, ExpenseCategory } from "../../types/Category";
import { useAuth } from "../auth/useAuth";

export default function NewTicket() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
    const [formData, setFormData] = useState({
        price: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCategoryChange = (categoryId: string) => {
        const category = DEFAULT_CATEGORIES.find(c => c.id === parseInt(categoryId));
        if (category) {
            setSelectedCategory(category);
            setFormData({
                price: category.defaultAmount?.toFixed(2) || '',
                description: category.defaultDescription || ''
            });
        } else {
            setSelectedCategory(null);
            setFormData({ price: '', description: '' });
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.price || !formData.description.trim()) {
            setError('Please fill in all required fields');
            return;
        }

        const price = parseFloat(formData.price);
        if (isNaN(price) || price <= 0) {
            setError('Please enter a valid amount greater than 0');
            return;
        }

        if (!user?.id) {
            setError('User not authenticated');
            return;
        }

        setLoading(true);
        try {
            const ticketData = {
                price: price,
                description: formData.description.trim(),
                createdById: user.id
            };

            await axios.post(`${base_url}/tickets`, ticketData);
            navigate('/employee');
        } catch (err: any) {
            console.error('Error submitting ticket:', err);
            setError(err.response?.data?.message || 'Failed to submit ticket. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Submit New Ticket</h2>

            {error && (
                <div style={{
                    color: '#ef4444',
                    marginBottom: '1rem',
                    padding: '12px',
                    background: '#fee2e2',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ef4444',
                    fontSize: '0.875rem'
                }}>
                    {error}
                </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="category">
                        Expense Category
                    </label>
                    <select
                        id="category"
                        className={styles.input}
                        value={selectedCategory?.id || ''}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        style={{ width: '80%', margin: 'auto' }}
                    >
                        <option value="">Select a category (optional)</option>
                        {DEFAULT_CATEGORIES.map(category => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <small style={{ color: '#6b7280', fontSize: '0.75rem' }}>
                        Selecting a category will auto-fill default values that you can modify
                    </small>
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="price">
                        Amount ($) *
                    </label>
                    <input
                        id="price"
                        className={styles.input}
                        name="price"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        placeholder="0.00"
                    />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="description">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        className={styles.input}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={4}
                        placeholder="Describe your expense..."
                        style={{
                            minHeight: '100px',
                            resize: 'vertical',
                            fontFamily: 'inherit'
                        }}
                    />
                </div>

                {selectedCategory && (
                    <div style={{
                        padding: '12px',
                        background: '#f0f9ff',
                        borderRadius: '8px',
                        borderLeft: '4px solid #2563eb',
                        fontSize: '0.875rem',
                        color: '#1e40af',
                        marginBottom: '12px'
                    }}>
                        <strong>Category:</strong> {selectedCategory.name}
                        <br />
                        Default values have been pre-filled. You can modify them as needed.
                    </div>
                )}

                <div className={styles.actions}>
                    <button
                        type="submit"
                        className={`${styles.button} ${styles.primary}`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                    <button
                        type="button"
                        className={styles.button}
                        onClick={() => navigate('/employee')}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
