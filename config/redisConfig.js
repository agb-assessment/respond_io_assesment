const Redis = require('ioredis');

class RedisSingleton {
    constructor() {
        if (!RedisSingleton.instance) {
            this.redis = new Redis({
                host: process.env.REDIS_HOST || 'redis',  // Use 'redis' service from docker-compose
                port: process.env.REDIS_PORT || 6379,    // Redis default port
                db: 0,                                   // Redis database index
                retryStrategy: (times) => {
                    return Math.min(times * 50, 2000);
                }
            });

            this.redis.on('connect', () => {
                console.log('Connected to Redis');
            });

            this.redis.on('ready', () => {
                console.log('Redis connection is ready');
            });

            this.redis.on('error', (err) => {
                console.log('Redis error:', err);
            });

            const originalSendCommand = this.redis.sendCommand;
            this.redis.sendCommand = (...args) => {
                console.log(`Redis Command: ${args[0].name} with arguments`, args);
                return originalSendCommand.apply(this.redis, args);
            };

            RedisSingleton.instance = this;
        }

        return RedisSingleton.instance;
    }

    getInstance() {
        return this.redis;
    }
}

const redisSingleton = new RedisSingleton();
module.exports = redisSingleton.getInstance();
