import dotenv from 'dotenv';
import createServer from './Infrastructures/http/createServer';

dotenv.config();

(async () => {
  const server = await createServer();

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
