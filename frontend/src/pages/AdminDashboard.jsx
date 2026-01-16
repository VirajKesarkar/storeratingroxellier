import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import Header from '../components/layout/Header';

const AdminDashboard = () => {
    const { api } = useAuth();

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalStores: 0,
        totalRatings: 0,
    });
    const [users, setUsers] = useState([]);
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [statsRes, usersRes, storesRes] = await Promise.all([
                api.get('/api/stores/dashboard-stats'),
                api.get('/api/users'),
                api.get('/api/stores'),
            ]);

            setStats(statsRes.data);
            setUsers(usersRes.data || []);
            setStores(storesRes.data || []);
        } catch (err) {
            setError('Failed to fetch admin dashboard data.');
        } finally {
            setLoading(false);
        }
    }, [api]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div style={styles.page}>
            <Header />

            <main style={styles.content}>
                <h2 style={styles.title}>Admin Dashboard</h2>

                {loading && (
                    <div style={styles.infoBox}>Loading dashboard…</div>
                )}

                {error && (
                    <div style={styles.errorBox}>{error}</div>
                )}

                {!loading && !error && (
                    <>
                        {/* STATS */}
                        <div style={styles.statsGrid}>
                            <div style={styles.statCard}>
                                <p style={styles.statLabel}>Total Users</p>
                                <p style={styles.statValue}>
                                    {stats.totalUsers}
                                </p>
                            </div>
                            <div style={styles.statCard}>
                                <p style={styles.statLabel}>Total Stores</p>
                                <p style={styles.statValue}>
                                    {stats.totalStores}
                                </p>
                            </div>
                            <div style={styles.statCard}>
                                <p style={styles.statLabel}>Total Ratings</p>
                                <p style={styles.statValue}>
                                    {stats.totalRatings}
                                </p>
                            </div>
                        </div>

                        {/* USERS TABLE */}
                        <div style={styles.tableSection}>
                            <h3 style={styles.sectionTitle}>
                                Manage Users
                            </h3>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    style={styles.emptyText}
                                                >
                                                    No users found.
                                                </td>
                                            </tr>
                                        )}

                                        {users.map((user) => (
                                            <tr
                                                key={user.id}
                                                style={styles.row}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.background =
                                                        '#FFF7ED')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.background =
                                                        '#FFFFFF')
                                                }
                                            >
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.address}</td>
                                                <td>
                                                    <span
                                                        style={styles.roleBadge}
                                                    >
                                                        {user.role}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* STORES TABLE */}
                        <div style={styles.tableSection}>
                            <h3 style={styles.sectionTitle}>
                                Manage Stores
                            </h3>

                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead style={styles.tableHead}>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Address</th>
                                            <th>Rating</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stores.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="4"
                                                    style={styles.emptyText}
                                                >
                                                    No stores found.
                                                </td>
                                            </tr>
                                        )}

                                        {stores.map((store) => (
                                            <tr
                                                key={store.id}
                                                style={styles.row}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.background =
                                                        '#FFF7ED')
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.background =
                                                        '#FFFFFF')
                                                }
                                            >
                                                <td>{store.name}</td>
                                                <td>{store.email || '—'}</td>
                                                <td>{store.address}</td>
                                                <td>
                                                    {store.overallRating
                                                        ? Number(
                                                              store.overallRating
                                                          ).toFixed(1)
                                                        : 'N/A'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;

/* ================= STYLES ================= */

const styles = {
    page: {
        minHeight: '100vh',
        background: '#FFF7ED',
    },
    content: {
        maxWidth: '1200px',
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
        marginBottom: '30px',
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
    tableHead: {
        background: '#FFEDD5',
        color: '#9A3412',
        textAlign: 'left',
    },
    row: {
        background: '#FFFFFF',
        color: '#1F2937',
        transition: 'background 0.15s ease',
        cursor: 'default',
    },
    roleBadge: {
        background: '#FFF7ED',
        color: '#F97316',
        padding: '4px 10px',
        borderRadius: '999px',
        fontWeight: '600',
        fontSize: '12px',
        display: 'inline-block',
    },
    emptyText: {
        textAlign: 'center',
        padding: '16px',
        color: '#6B7280',
    },
};
