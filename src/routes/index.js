const express = require('express');
const router = express.Router();

const publicRoutes = require('./publicRoutes');
const protectedRoutes = require('./protectedRoutes');


// Register public routes
router.use('/', publicRoutes);

// Register protected routes directly
router.use('/api', protectedRoutes);

module.exports = router;
