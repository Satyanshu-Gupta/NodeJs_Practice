const { createClient } = require('redis');

let redisClient = null;

// Set up Redis client asynchronously
function connectRedis() {
  return new Promise((resolve, reject) => {
    try {
      // Create the Redis client
      redisClient = createClient({
        host: 'redis',  //container name from docker file
        port: 6379
      });

      // Connect the Redis client
      redisClient.connect()
        .then(() => {
          // Listen for any Redis client errors
          redisClient.on('error', (err) => {
            console.log('Redis Client Error:', err);
          });

          resolve();
        })
        .catch((err) => {
          console.error('Error while connecting to Redis:', err);
          reject(err);
        });
    } catch (err) {
      console.error('Error while connecting to Redis:', err);
      reject(err);
    }
  });
}

// Export the redisClient after the connection is established
const getRedisClient = () => {
  if (!redisClient) {
    throw new Error("Redis client is not initialized yet.");
  }
  return redisClient;
};

connectRedis()
  .then()
  .catch((err) => {
    console.error('Failed to connect to Redis:', err);
  });

module.exports = { connectRedis, getRedisClient };