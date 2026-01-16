import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';

const UserDashboard = () => {
    const [stores, setStores] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { api } = useAuth();

    const fetchStores = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchTerm) params.append(searchType, searchTerm);

            const response = await api.get(`/api/stores?${params.toString()}`);
            setStores(response.data);
        } catch {
            setError('Failed to fetch stores.');
        } finally {
            setLoading(false);
        }
    }, [api, searchTerm, searchType]);

    useEffect(() => {
        fetchStores();
    }, [fetchStores]);

    const handleRatingSubmit = async (storeId, rating) => {
        try {
            await api.post(`/api/stores/${storeId}/ratings`, { rating });
            fetchStores();
        } catch {
            alert('Failed to submit rating');
        }
    };

    return (
        <div style={styles.page}>
            <Header />

            <main style={styles.container}>
                <h2 style={styles.title}>Explore Stores</h2>

                {/* SEARCH */}
                <div style={styles.searchBar}>
                    <input
                        style={styles.searchInput}
                        placeholder={`Search by ${searchType}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        style={styles.searchSelect}
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="name">Name</option>
                        <option value="address">Address</option>
                    </select>
                </div>

                {loading && <p>Loading stores...</p>}
                {error && <p style={styles.error}>{error}</p>}

                <div style={styles.grid}>
                    {!loading &&
                        stores.map((store) => (
                            <StoreCard
                                key={store.id}
                                store={store}
                                onRate={handleRatingSubmit}
                            />
                        ))}
                </div>
            </main>
        </div>
    );
};

/* ---------------- STORE CARD ---------------- */

const StoreCard = ({ store, onRate }) => {
    const [rating, setRating] = useState(store.userSubmittedRating || 0);
    const [hover, setHover] = useState(0);

    return (
        <div style={styles.card}>
            <h3 style={styles.storeName}>{store.name}</h3>
            <p style={styles.address}>{store.address}</p>

            <div style={styles.ratingRow}>
                <span>
                    Overall: <strong>{store.overallRating ?? 'N/A'}</strong>
                </span>
                <span>
                    Your Rating:{' '}
                    <strong>
                        {store.userSubmittedRating ?? 'Not rated'}
                    </strong>
                </span>
            </div>

            {/* STAR RATING */}
            <div style={styles.stars}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{
                            ...styles.star,
                            color:
                                star <= (hover || rating)
                                    ? '#F97316'
                                    : '#E5E7EB',
                        }}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        onClick={() => setRating(star)}
                    >
                        ★
                    </span>
                ))}
            </div>

            <button
                style={styles.button}
                onClick={() => onRate(store.id, rating)}
            >
                {store.userSubmittedRating ? 'Update Rating' : 'Submit Rating'}
            </button>
        </div>
    );
};

export default UserDashboard;

/* ---------------- STYLES ---------------- */

const styles = {
    page: {
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #FFF7ED 0%, #FFFFFF 60%)',
    },

    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '28px 24px',
    },

    title: {
        fontSize: '28px',
        fontWeight: '800',
        marginBottom: '24px',
        color: '#111827',
        letterSpacing: '-0.3px',
    },

    /* SEARCH */

    searchBar: {
        display: 'flex',
        gap: '14px',
        marginBottom: '30px',
    },

    searchInput: {
        flex: 1,
        padding: '14px 16px',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        outline: 'none',
        fontSize: '14px',
        transition: 'all 0.25s ease',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
    },

    searchSelect: {
        padding: '14px 16px',
        borderRadius: '10px',
        border: '1px solid #E5E7EB',
        background: '#fff',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        color: '#374151'
    },

    /* GRID */

    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '22px',
    },

    /* STORE CARD */

    card: {
        background: '#FFFFFF',
        padding: '22px',
        borderRadius: '16px',
        border: '1px solid #F1F5F9',
        boxShadow: '0 10px 25px rgba(0,0,0,0.06)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
    },

    storeName: {
        fontSize: '19px',
        fontWeight: '700',
        marginBottom: '6px',
        color: '#111827',
    },

    address: {
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '14px',
        lineHeight: '1.5',
    },

    ratingRow: {
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '14px',
        color: '#374151',
        marginBottom: '14px',
    },

    /* STARS */

    stars: {
        display: 'flex',
        gap: '6px',
        marginBottom: '18px',
    },

    star: {
        fontSize: '28px',
        cursor: 'pointer',
        transition: 'transform 0.15s ease, color 0.15s ease',
    },

    /* BUTTON */

    button: {
        width: '100%',
        padding: '12px',
        background: 'linear-gradient(135deg, #F97316, #FB923C)',
        border: 'none',
        color: '#fff',
        borderRadius: '10px',
        fontWeight: '700',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: '0 6px 14px rgba(249,115,22,0.35)',
    },

    error: {
        color: '#DC2626',
        fontWeight: '500',
    },
};
