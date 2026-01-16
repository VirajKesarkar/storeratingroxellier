const db = require('../config/db');

/* ============================
   ADMIN CREATES A NEW STORE
============================ */
exports.createStoreByAdmin = async (req, res) => {
    const { name, email, address, owner_id } = req.body;

    if (!name || !email || !address) {
        return res.status(400).json({
            message: 'Please provide name, email, and address for the store'
        });
    }

    try {
        if (owner_id) {
            const [users] = await db.query(
                'SELECT role FROM users WHERE id = ?',
                [owner_id]
            );

            if (users.length === 0 || users[0].role !== 'STORE_OWNER') {
                return res.status(400).json({
                    message: 'Invalid owner ID or user is not a Store Owner'
                });
            }
        }

        await db.query(
            'INSERT INTO stores (name, email, address, owner_id) VALUES (?, ?, ?, ?)',
            [name, email, address, owner_id || null]
        );

        res.status(201).json({ message: 'Store created successfully' });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                message: 'A store with this email already exists'
            });
        }

        res.status(500).json({ message: 'Server error while creating store' });
    }
};

/* ============================
   ADMIN DASHBOARD STATS
============================ */
exports.getDashboardStats = async (req, res) => {
    try {
        const [[users]] = await db.query('SELECT COUNT(*) AS total FROM users');
        const [[stores]] = await db.query('SELECT COUNT(*) AS total FROM stores');
        const [[ratings]] = await db.query('SELECT COUNT(*) AS total FROM ratings');

        res.json({
            totalUsers: users.total,
            totalStores: stores.total,
            totalRatings: ratings.total
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error while fetching dashboard stats'
        });
    }
};

/* ============================
   GET ALL STORES (FIXED)
============================ */
exports.getAllStores = async (req, res) => {
    const { name, address } = req.query;
    const userId = req.user.id;

    try {
        let sql = `
            SELECT
                s.id,
                s.name,
                s.address,
                s.email,
                ROUND(AVG(r.rating), 2) AS overallRating,
                MAX(CASE WHEN r.user_id = ? THEN r.rating END) AS userSubmittedRating
            FROM stores s
            LEFT JOIN ratings r ON s.id = r.store_id
            WHERE 1=1
        `;

        const params = [userId];

        if (name) {
            sql += ' AND s.name LIKE ?';
            params.push(`%${name}%`);
        }

        if (address) {
            sql += ' AND s.address LIKE ?';
            params.push(`%${address}%`);
        }

        sql += `
            GROUP BY s.id
            ORDER BY s.name ASC
        `;

        const [stores] = await db.query(sql, params);

        res.json(
            stores.map(store => ({
                ...store,
                overallRating: store.overallRating ?? 'N/A',
                userSubmittedRating: store.userSubmittedRating ?? null
            }))
        );

    } catch (error) {
        console.error('getAllStores error:', error);
        res.status(500).json({
            message: 'Server error while fetching stores'
        });
    }
};


/* ============================
   USER SUBMITS / UPDATES RATING
============================ */
exports.submitOrUpdateRating = async (req, res) => {
    const { storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    if (!rating || rating < 1 || rating > 5) {
        return res.status(400).json({
            message: 'Rating must be between 1 and 5'
        });
    }

    try {
        await db.query(
            `
            INSERT INTO ratings (user_id, store_id, rating)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE rating = ?
            `,
            [userId, storeId, rating, rating]
        );

        res.json({ message: 'Rating submitted successfully' });

    } catch (error) {
        console.error(error);

        if (error.code === 'ER_NO_REFERENCED_ROW_2') {
            return res.status(404).json({ message: 'Store not found' });
        }

        res.status(500).json({
            message: 'Server error while submitting rating'
        });
    }
};

/* ============================
   STORE OWNER DASHBOARD
============================ */
exports.getStoreOwnerDashboard = async (req, res) => {
    const ownerId = req.user.id;

    try {
        const [stores] = await db.query(
            'SELECT id FROM stores WHERE owner_id = ?',
            [ownerId]
        );

        if (stores.length === 0) {
            return res.status(404).json({
                message: "You don't have a store assigned"
            });
        }

        const storeId = stores[0].id;

        const [[avg]] = await db.query(
            'SELECT ROUND(AVG(rating), 2) AS averageRating FROM ratings WHERE store_id = ?',
            [storeId]
        );

        const [raters] = await db.query(
            `
            SELECT
                u.name,
                u.email,
                r.rating,
                r.updated_at
            FROM ratings r
            JOIN users u ON r.user_id = u.id
            WHERE r.store_id = ?
            ORDER BY r.updated_at DESC
            `,
            [storeId]
        );

        res.json({
            averageRating: avg.averageRating ?? 'N/A',
            raters
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server error while fetching store dashboard'
        });
    }
};
