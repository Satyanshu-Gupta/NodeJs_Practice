const express = require('express');
const app = express();
const authenticateToken = require('./authenticateToken');

app.use(express.json());

app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ message: 'This is a protected route', user: req.user });
});
