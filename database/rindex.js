const asyncRedis = require('async-redis');

const host = process.env.REDIS_HOST_6379_TCP_ADDR || 'localhost';
const port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
const clientRedis = asyncRedis.createClient(port, host);
clientRedis.on('error', console.error.bind(console, 'Redis connection error:'));
clientRedis.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = clientRedis;
