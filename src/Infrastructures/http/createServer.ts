import Hapi from '@hapi/hapi';

const createServer = async () => {
  const server = Hapi.server({
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World' }),
  });

  return server;
};

export default createServer;
