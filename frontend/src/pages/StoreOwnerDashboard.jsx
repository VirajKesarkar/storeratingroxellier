import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';

const StoreOwnerDashboard = () => {
    const { api } = useAuth();
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const res = await api.get('/api/stores/my-store');
                setDashboardData(res.data);
            } catch (err) {
                setError(
                    err.response?.data?.message ||
                        'Failed to load store dashboard'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDashboard();
    }, [api]);

    return (
        <div style={styles.page}>
            <Header />

            <main style={styles.content}>
                <h2 style={styles.title}>My Store Dashboard</h2>

                {/* LOADING */}
                {loading && (
                    <div style={styles.infoBox}>
                        Loading store data…
                    </div>
                )}

                {/* ERROR */}
                {error && (
                    <div style={styles.errorBox}>{error}</div>
                )}

                {/* DATA */}
                {!loading && !error && dashboardData && (
                    <>
                        {/* STATS */}
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard}>
                                <p style={styles.statLabel}>
                                    Average Rating
                                </p>
                                <p style={styles.statValue}>
                                    {dashboardData.averageRating
                                        ? Number(
                                              dashboardData.averageRating
                                          ).toFixed(1)
                                        : 'N/A'}
                                </p>
                            </div>

                            <div style={styles.statCard}>
                                <p style={styles.statLabel}>
                                    Total Ratings
                                </p>
                                <p style={styles.statValue}>
                                    {dashboardData.raters?.length || 0}
                                </p>
                            </div>
                        </div>

                        {/* RATINGS TABLE */}
                        <div style={styles.tableSection}>
                            <h3 style={styles.sectionTitle}>
                                Users Who Rated Your Store
                            </h3>

                            {dashboardData.raters?.length === 0 && (
                                <p style={styles.emptyText}>
                                    No ratings have been submitted yet.
                                </p>
                            )}

                            {dashboardData.raters?.length > 0 && (
                                <div style={styles.tableWrapper}>
                                    <table style={styles.table}>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Rating</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[...dashboardData.raters]
                                                .sort(
                                                    (a, b) =>
                                                        new Date(
                                                            b.updated_at || 0
                                                        ) -
                                                        new Date(
                                                            a.updated_at || 0
                                                        )
                                                )
                                                .map((rater, idx) => (
                                                    <tr
                                                        key={idx}
                                                        style={styles.row}
                                                        onMouseEnter={(e) => {
                                                            e.currentTarget.style.background =
                                                                '#FFF7ED';
                                                        }}
                                                        onMouseLeave={(e) => {
                                                            e.currentTarget.style.background =
                                                                '#FFFFFF';
                                                        }}
                                                    >
                                                        <td>{rater.name}</td>
                                                        <td>{rater.email}</td>
                                                        <td>
                                                            <span
                                                                style={
                                                                    styles.ratingBadge
                                                                }
                                                            >
                                                                {rater.rating}{' '}
                                                                ★
                                                            </span>
                                                        </td>
                                                        <td>
                                                            {rater.updated_at
                                                                ? new Date(
                                                                      rater.updated_at
                                                                  ).toLocaleDateString()
                                                                : '—'}
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default StoreOwnerDashboard;

/* ================= STYLES ================= */

const styles = {
    page: {
        minHeight: '100vh',
        background: '#FFF7ED',
    },
    content: {
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '24px',
    },
    title: {
        fontSize: '26px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '20px',
    },
    infoBox: {
        background: '#FFFFFF',
        padding: '16px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        marginBottom: '20px',
        color: '#1F2937',
    },
    errorBox: {
        background: '#FEE2E2',
        color: '#DC2626',
        padding: '16px',
        borderRadius: '8px',
        marginBottom: '20px',
    },
    statsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
    },
    statCard: {
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        color: '#1F2937',
    },
    statLabel: {
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '6px',
    },
    statValue: {
        fontSize: '28px',
        fontWeight: '700',
        color: '#F97316',
    },
    tableSection: {
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '20px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        color: '#F97316',
    },
    sectionTitle: {
        fontSize: '18px',
        fontWeight: '600',
        marginBottom: '14px',
        color: '#1F2937',
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    row: {
        background: '#FFFFFF',
        color: '#1F2937',
        transition: 'background 0.15s ease',
        cursor: 'default',
    },
    ratingBadge: {
        background: '#FFF7ED',
        color: '#F97316',
        padding: '4px 10px',
        borderRadius: '6px',
        fontWeight: '600',
        display: 'inline-block',
    },
    emptyText: {
        color: '#6B7280',
        fontSize: '14px',
    },
};
