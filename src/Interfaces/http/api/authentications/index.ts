import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import AuthenticationHandler from './handler';
import routes from './routes';

type PluginOptions = {
  container: Container,
};

const authentications = {
  name: 'authentications',
  register: async (server: Server, { container }: PluginOptions) => {
    const authenticationHandler = new AuthenticationHandler(container);
    server.route(routes(authenticationHandler));
  },
};

export default authentications;
