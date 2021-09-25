import { ServerRoute } from '@hapi/hapi';
import AuthenticationHandler from './handler';

const routes = (handler: AuthenticationHandler): ServerRoute[] => [
  {
    method: 'POST',
    path: '/authentications',
    handler: handler.postAuthenticationHandler,
  },
  {
    method: 'PUT',
    path: '/authentications',
    handler: handler.putAuthenticationHandler,
  },
  {
    method: 'DELETE',
    path: '/authentications',
    handler: handler.deleteAuthenticationHandler,
  },
];

export default routes;
