import * as redis from 'redis';
import config from '../../../Commons/config';

const createRedisClient = async () => {
  const client = redis.createClient({
    socket: {
      host: config.redis.server,
    },
  });

  client.on('error', (err) => {
    console.log('Redis error: ', err);
  });

  return client;
};

export default createRedisClient;
