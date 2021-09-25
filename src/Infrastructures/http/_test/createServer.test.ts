import createServer from '../createServer';
import Logger from '../../../Applications/log/Logger';
import container from '../../container/container';

describe('createServer', () => {
  it('should return Hello World when GET /', async () => {
    // Arrange
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/',
    });

    // Assert
    const responseJson = JSON.parse(response.payload);
    expect(response.statusCode).toEqual(200);
    expect(responseJson.message).toEqual('Hello World');
  });

  it('should return 404 when request unregistered route', async () => {
    // Arrange
    const server = await createServer(container);

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/not-found',
    });

    // Assert
    expect(response.statusCode).toEqual(404);
  });

  it('should return 500 when face the server error', async () => {
    // Arrange
    const server = await createServer(container); // fake container
    const spyLogger = jest.spyOn(<Logger> container.getInstance('Logger'), 'writeError');
    server.route({
      method: 'GET',
      path: '/error-path',
      handler: () => { throw new Error('Ups there some error!'); },
    });

    // Action
    const response = await server.inject({
      method: 'GET',
      url: '/error-path',
    });

    // Arrange
    expect(response.statusCode).toEqual(500);
    expect(spyLogger).toBeCalled();
  });
});
