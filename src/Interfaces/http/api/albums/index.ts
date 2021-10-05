import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import AlbumsHandler from './handler';
import routes from './routes';

type PluginOption = {
  container: Container
}
const albums = {
  name: 'albums',
  register: async (server: Server, { container }: PluginOption) => {
    const handler = new AlbumsHandler(container);
    server.route(routes(handler));
  },
};

export default albums;
