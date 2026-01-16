const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/authMiddleware');

// --- Admin Routes ---

router.post('/', protect, isAdmin, userController.createUserByAdmin); // to create a new user

router.get('/', protect, isAdmin, userController.getAllUsersByAdmin); // to get all users

router.get('/:id', protect, isAdmin, userController.getUserByIdByAdmin); // to get a single user by ID

router.put('/update-password', protect, userController.updateUserPassword); // to update the logged-in user's password

module.exports = router;
