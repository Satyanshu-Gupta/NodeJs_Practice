const authorizeRole = (role) => (req, res, next) => {
    if (req.user.Role.role_name !== role) return res.sendStatus(403);
    next();
};

module.exports = authorizeRole;