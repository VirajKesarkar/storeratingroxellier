const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// --- Admin Routes ---
router.post('/', protect, isAdmin, storeController.createStoreByAdmin);
router.get('/dashboard-stats', protect, isAdmin, storeController.getDashboardStats);

// --- Store Owner Route ---
// THIS IS THE NEW LINE WE ARE ADDING
router.get('/my-store', protect, storeController.getStoreOwnerDashboard);

// --- Public/User Routes ---
router.get('/', protect, storeController.getAllStores);

// --- Rating Routes for a specific store ---
router.post('/:storeId/ratings', protect, storeController.submitOrUpdateRating);

module.exports = router;