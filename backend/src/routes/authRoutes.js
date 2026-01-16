const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.registerUser); // to post the user registration data

router.post('/login', authController.loginUser); // to post the user login data 

module.exports = router;