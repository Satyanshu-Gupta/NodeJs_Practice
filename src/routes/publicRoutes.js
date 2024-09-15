const express = require('express');
const router = express.Router();
const LoginController = require('../modules/Login/Controller/LoginController');
const AuthController = require('../modules/Auth/Controller/AuthController');

// Public routes
router.post('/login', LoginController.login);
router.post('/register', AuthController.registerUser);
// router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;
