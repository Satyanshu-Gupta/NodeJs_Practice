const authorizeRole = (role) => (req, res, next) => {
    if (req.user?.roleName !== role) return res.status(403).json({ message: 'You are not authorized to access.' });
    next();
};

module.exports = authorizeRole;