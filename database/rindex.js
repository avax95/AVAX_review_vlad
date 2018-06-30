const asyncRedis = require('async-redis');

const clientRedis = asyncRedis.createClient();
clientRedis.on('error', console.error.bind(console, 'Redis connection error:'));
clientRedis.on('connect', () => {
  console.log('Redis client connected');
});

module.exports = clientRedis;
