import Hapi from '@hapi/hapi';
import { Container } from 'instances-container';
import config from '../../Commons/config';
import users from '../../Interfaces/http/api/users';

const createServer = async (container: Container) => {
  const server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World' }),
  });

  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
  ]);

  return server;
};

export default createServer;
