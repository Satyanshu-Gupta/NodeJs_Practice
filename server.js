require('module-alias/register');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('@config/database');
const corsConfig = require('@config/cors');
const { connectRedis, getRedisClient } = require('@config/redis');

// Import and use routes
const routes = require('@routes');

const app = express();

// Middleware setup
app.use(corsConfig);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); // For parsing application/json

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
