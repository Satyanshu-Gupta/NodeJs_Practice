const express = require('express');
const router = express.Router();
const AuthController = require('../AuthController/AuthController');
const AuthMiddlewares = require('../Middlewares/AuthMiddlewares');

// Apply middleware to routes in this module
router.use(AuthMiddlewares);

router.post('/register', AuthController.registerUser );

module.exports = router;
