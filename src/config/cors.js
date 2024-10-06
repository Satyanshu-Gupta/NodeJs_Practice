const cors = require('cors');

const corsOptions = {
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile or when testing from postman without setting Origin header)
        if (!origin) return callback(null, true);
        // Allowed origins here
        const allowedOrigins = ['http://example.com', 'http://anotherdomain.com'];
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials
    optionsSuccessStatus: 204,
};

module.exports = cors(corsOptions);
