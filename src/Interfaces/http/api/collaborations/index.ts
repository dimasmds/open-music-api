import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import CollaborationsHandler from './handler';
import routes from './routes';

const collaborations = {
  name: 'collaborations',
  register: async (server: Server, { container } : { container: Container}) => {
    const handler = new CollaborationsHandler(container);
    server.route(routes(handler));
  },
};

export default collaborations;
