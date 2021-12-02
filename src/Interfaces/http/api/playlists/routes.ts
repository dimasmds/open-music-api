import { ServerRoute } from '@hapi/hapi';
import PlaylistsHandler from './handler';

const routes = (handler: PlaylistsHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/playlists',
    handler: handler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
