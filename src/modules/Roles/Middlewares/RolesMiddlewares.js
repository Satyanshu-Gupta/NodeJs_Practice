const RolesMiddleware = (req, res, next) => {
    console.log(`Request received at ${req.originalUrl}`);
    next();
    
}

module.exports = RolesMiddleware;