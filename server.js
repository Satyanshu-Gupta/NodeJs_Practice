require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit')
const sequelize = require('@config/database');
const corsConfig = require('@config/cors');
const { connectRedis, getRedisClient } = require('@config/redis');

// Import and use routes
const routes = require('@routes');

const app = express();

const jsonPayloadLimit = '10mb';

// Middleware setup
app.use(corsConfig);
app.use(bodyParser.urlencoded({ extended: false, limit: jsonPayloadLimit })); // Middleware to parse URL-encoded data
app.use(express.json({ limit: jsonPayloadLimit })); // For parsing application/json

// Sync models with database
sequelize.sync({ force: false, alter: false })
    .then(() => {
        console.log('Database Connected!');
    })
    .catch((error) => {
        console.error('Error connecting to database: ', error);
    });

// Function to ensure Redis connection before starting the server
async function startServer() {
    try {
        // Wait for Redis to be connected
        await connectRedis(); // Make sure Redis connects first
        const redisClient = getRedisClient(); // Get the Redis client after successful connection
        console.log('Redis connected successfully!');

        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, // 15 minutes
            limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
            standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
            legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
            // store: ... , // Redis, Memcached, etc. See below.
        })
        
        // Apply the rate limiting middleware to all requests.
        app.use(limiter)

        // Now, start the Express server
        const PORT = process.env.SERVER_PORT || 3000; // Default to 3000 if SERVER_PORT is not set
        app.use('/', routes);
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to Redis:', error);
        process.exit(1); // Exit the application if Redis connection fails
    }
}

startServer(); // Call function to start the server after Redis connection
