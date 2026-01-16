import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header style={styles.header}>
            <div style={styles.container}>
                {/* LOGO / TITLE */}
                <div style={styles.left}>
                    <span style={styles.logo}>★</span>
                    <h1 style={styles.title}>Store Ratings</h1>
                </div>

                {/* USER INFO */}
                {user && (
                    <div style={styles.right}>
                        <div style={styles.userBox}>
                            <p style={styles.welcome}>
                                Welcome,
                            </p>
                            <p style={styles.userName}>
                                {user.name}
                            </p>
                            <span style={styles.roleBadge}>
                                {user.role}
                            </span>
                        </div>

                        <button
                            style={styles.logoutBtn}
                            onClick={logout}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.background =
                                    '#EA580C')
                            }
                            onMouseLeave={(e) =>
                                (e.currentTarget.style.background =
                                    '#F97316')
                            }
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;

/* ================= STYLES ================= */

const styles = {
    header: {
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    left: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        fontSize: '22px',
        color: '#F97316',
    },
    title: {
        fontSize: '20px',
        fontWeight: '700',
        color: '#1F2937',
        margin: 0,
    },
    right: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
    },
    userBox: {
        textAlign: 'right',
        lineHeight: '1.2',
    },
    welcome: {
        fontSize: '12px',
        color: '#6B7280',
        margin: 0,
    },
    userName: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#1F2937',
        margin: 0,
    },
    roleBadge: {
        display: 'inline-block',
        marginTop: '2px',
        fontSize: '11px',
        fontWeight: '600',
        color: '#9A3412',
        background: '#FFEDD5',
        padding: '2px 8px',
        borderRadius: '999px',
    },
    logoutBtn: {
        background: '#F97316',
        color: '#FFFFFF',
        border: 'none',
        padding: '8px 14px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s ease',
    },
};
