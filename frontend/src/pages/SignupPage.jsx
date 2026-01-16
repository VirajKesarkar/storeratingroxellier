import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const { api } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            await api.post('api/auth/register', {
                name,
                email,
                address,
                password,
            });

            setSuccess('Registration successful! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to sign up. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.page}>
            <div style={styles.card}>
                <h2 style={styles.title}>Create an Account</h2>
                <p style={styles.subtitle}>
                    Join the Store Rating Platform
                </p>

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.field}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your full name"
                            required
                            style={styles.input}
                        />
                    </div>

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
                        <label style={styles.label}>Address</label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder="Your full address"
                            required
                            rows={3}
                            style={styles.textarea}
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

                    {error && <div style={styles.errorBox}>{error}</div>}
                    {success && <div style={styles.successBox}>{success}</div>}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            opacity: loading ? 0.7 : 1,
                        }}
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <Link to="/login" style={styles.link}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignupPage;

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
        maxWidth: '480px',
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
        gap: '14px',
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
    textarea: {
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #E5E7EB',
        fontSize: '14px',
        resize: 'none',
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
    successBox: {
        background: '#ECFDF5',
        color: '#047857',
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
