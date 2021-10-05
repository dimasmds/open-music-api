import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import SongsHandler from './handler';
import routes from './routes';

type PluginOption = {
  container: Container
}

const songs = {
  name: 'songs',
  register: async (server: Server, { container } : PluginOption) => {
    const handler = new SongsHandler(container);
    server.route(routes(handler));
  },
};

export default songs;
