import { ServerRoute } from '@hapi/hapi';
import CollaborationsHandler from './handler';

const routes = (handler: CollaborationsHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
];

export default routes;
