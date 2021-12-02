import Hapi, { Request, ResponseToolkit } from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import { Container } from 'instances-container';
import config from '../../Commons/config';
import users from '../../Interfaces/http/api/users';
import DomainToHttpErrorTranslator from '../../Commons/exceptions/DomainToHttpErrorTranslator';
import ClientError from '../../Commons/exceptions/ClientError';
import Logger from '../../Applications/log/Logger';
import authentications from '../../Interfaces/http/api/authentications';
import albums from '../../Interfaces/http/api/albums';
import songs from '../../Interfaces/http/api/songs';
import playlists from '../../Interfaces/http/api/playlists';

const createServer = async (container: Container) => {
  const logger = <Logger> container.getInstance('Logger');

  const server = Hapi.server({
    host: config.server.host,
    port: config.server.port,
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({ message: 'Hello World' }),
  });

  // external plugins
  await server.register([
    {
      plugin: Jwt.plugin,
    },
  ]);

  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: config.security.accessTokenSecret,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: config.security.accessTokenExpiresIn,
    },
    validate: (artifacts: any) => ({
      isValid: true,
      credentials: {
        userId: artifacts.decoded.payload.userId,
      },
    }),
  });

  // internal plugins
  await server.register([
    {
      plugin: users,
      options: {
        container,
      },
    },
    {
      plugin: authentications,
      options: {
        container,
      },
    },
    {
      plugin: albums,
      options: {
        container,
      },
    },
    {
      plugin: songs,
      options: {
        container,
      },
    },
    {
      plugin: playlists,
      options: {
        container,
      },
    },
  ]);

  server.ext('onPreResponse', (request: Request, h: ResponseToolkit) => {
    const { response } = request;

    if (response instanceof Error) {
      const translatedError = DomainToHttpErrorTranslator.translate(response);

      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });
        newResponse.code(translatedError.statusCode);
        logger.writeClientError(response);
        return newResponse;
      }

      if (!response.isServer) {
        return response;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });

      newResponse.code(500);
      logger.writeError(response);
      return newResponse;
    }
    return response;
  });

  return server;
};

export default createServer;
