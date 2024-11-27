const { getRedisClient } = require('@config/redis');

const redisClient = getRedisClient()


// Get value by key from Redis
const getFromCache = async (req, res, next) => {
  try {
    const result = await redisClient.get(`${req?.baseUrl}:${req?._parsedUrl?.query}`);
    let parsedData = JSON.parse(result)
    console.log(`fetch from cache ${req?.baseUrl}:${req?._parsedUrl?.query}`);
    
    return result ? res.status(200).json({ data: parsedData, fromCache: true}) : next();
  } catch (err) {
    console.error('Error getting from Redis cache:', err);
    return null;
  }
};

// Set value to Redis with a TTL (time-to-live)
const setToCache = async (key, value, ttl = 60) => {
  try {
    await redisClient.set(key, JSON.stringify(value), { EX: ttl });
    console.log(`Set ${key} in Redis`);
  } catch (err) {
    console.error('Error setting to Redis cache:', err);
  }
};

// Delete a key from Redis
const deleteFromCache = async (key) => {
  try {
    await redisClient.del(key);
    console.log(`Deleted ${key} from Redis`);
  } catch (err) {
    console.error('Error deleting from Redis:', err);
  }
};

module.exports = {
  getFromCache,
  setToCache,
  deleteFromCache,
};
