const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/authenticateToken'); // Adjust the path if necessary
const UsersRoutes = require('../modules/Users/Routes/UsersRoutes');

router.use('/users', authenticateToken, UsersRoutes);

module.exports = router;
