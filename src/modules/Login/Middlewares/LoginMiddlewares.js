const LoginMiddleware = (req, res, next) => {
    console.log(`Request received at ${req.originalUrl}`);
    next();
}

module.exports = LoginMiddleware;