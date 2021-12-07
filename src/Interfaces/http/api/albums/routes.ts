import { ServerRoute } from '@hapi/hapi';
import AlbumsHandler from './handler';

const routes = (handler: AlbumsHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/albums',
    handler: handler.postAlbumHandler,
  },
  {
    method: 'GET',
    path: '/albums/{id}',
    handler: handler.getAlbumByIdHandler,
  },
  {
    method: 'PUT',
    path: '/albums/{id}',
    handler: handler.putAlbumByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/albums/{id}',
    handler: handler.deleteAlbumByIdHandler,
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/covers',
    handler: handler.postAlbumCoverHandler,
    options: {
      payload: {
        allow: 'multipart/form-data',
        multipart: { output: 'stream' },
        maxBytes: 500000,
      },
    },
  },
  {
    method: 'POST',
    path: '/albums/{albumId}/likes',
    handler: handler.postAlbumLikeHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    method: 'GET',
    path: '/albums/{albumId}/likes',
    handler: handler.getAlbumLikesHandler,
  },
];

export default routes;
