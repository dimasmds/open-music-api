import { Server } from '@hapi/hapi';
import { Container } from 'instances-container';
import PlaylistsHandler from './handler';
import routes from './routes';

const playlists = {
  name: 'playlists',
  register: async (server: Server, { container }: { container : Container}) => {
    const handler = new PlaylistsHandler(container);
    server.route(routes(handler));
  },
};

export default playlists;
