import Hapi from '@hapi/hapi';
import config from '../../Commons/config';

const createServer = async () => {
  const server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World' }),
  });

  return server;
};

export default createServer;
