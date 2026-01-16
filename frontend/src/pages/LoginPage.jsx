import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Invalid email or password'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Welcome Back</h2>
                <p style={styles.subtitle}>
                    Login to your Store Rating account
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.field}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            style={styles.input}
                        />
                    </div>

                    {error && (
                        <div style={styles.errorBox}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Don’t have an account?{' '}
                    <Link to="/signup" style={styles.link}>
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;

/* ---------- STYLES (WHITE + ORANGE THEME) ---------- */

const styles = {
    page: {
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#FFF7ED',
        padding: '20px',
    },
    card: {
        width: '100%',
        maxWidth: '420px',
        background: '#FFFFFF',
        borderRadius: '12px',
        padding: '32px',
        boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
        border: '1px solid #E5E7EB',
    },
    title: {
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: '700',
        color: '#1F2937',
        marginBottom: '6px',
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#6B7280',
        marginBottom: '24px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '600',
        color: '#374151',
    },
    input: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #E5E7EB',
        fontSize: '14px',
        outline: 'none',
    },
    button: {
        marginTop: '10px',
        padding: '12px',
        background: '#F97316',
        color: '#FFFFFF',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
    },
    errorBox: {
        background: '#FEE2E2',
        color: '#DC2626',
        padding: '10px',
        borderRadius: '6px',
        fontSize: '13px',
        textAlign: 'center',
    },
    footerText: {
        marginTop: '22px',
        textAlign: 'center',
        fontSize: '14px',
        color: '#374151',
    },
    link: {
        color: '#F97316',
        fontWeight: '600',
        textDecoration: 'none',
    },
};
