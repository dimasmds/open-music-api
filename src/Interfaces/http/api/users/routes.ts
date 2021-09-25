import { ServerRoute } from '@hapi/hapi';
import UserHandler from './handler';

const routes = (handler: UserHandler) : ServerRoute[] => [
  {
    method: 'POST',
    path: '/users',
    handler: handler.postUserHandler,
  },
];

export default routes;
