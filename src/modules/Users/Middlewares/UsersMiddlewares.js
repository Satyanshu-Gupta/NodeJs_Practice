const validateUser = (req, res, next) => {
    const { name, email, username, password } = req.body;
    if (!name || !email || !username || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    // Add additional validation logic as needed
    next();
};


module.exports = {
    validateUser
};
