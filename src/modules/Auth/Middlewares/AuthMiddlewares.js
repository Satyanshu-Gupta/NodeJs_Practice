// Middleware to log request details
const registerMiddleware = (req, res, next) => {
    console.log(`Request received at ${req.originalUrl}`);
    next();
};

module.exports = registerMiddleware;
