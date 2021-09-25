import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import UserHandler from './handler';
import routes from './routes';

type PluginOption = {
  container: Container
}

const users = {
  name: 'users',
  register: async (server: Server, { container }: PluginOption) => {
    const userHandler = new UserHandler(container);
    server.route(routes(userHandler));
  },
};

export default users;
