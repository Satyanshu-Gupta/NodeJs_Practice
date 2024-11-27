const express = require('express');
const router = express.Router();
const authenticateToken = require('@middlewares/authenticateToken'); // Adjust the path if necessary
const UsersRoutes = require('@modules/Users/Routes/UsersRoutes');
const { getFromCache } = require('@services/redisServices')

router.use('/users', authenticateToken, getFromCache, UsersRoutes);

module.exports = router;
