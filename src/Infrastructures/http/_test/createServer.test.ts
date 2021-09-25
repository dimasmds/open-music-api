import { Container } from 'instances-container';
import createServer from '../createServer';

describe('createServer', () => {
  it('should return Hello World when GET /', async () => {
    // Arrange
    const server = await createServer(<Container>{});

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
    const server = await createServer(<Container>{});

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
    const server = await createServer(<Container>{}); // fake container

    // Action
    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username: 'dimas',
        password: 'secret',
        fullname: 'dimas maulana',
      },
    });

    // Arrange
    expect(response.statusCode).toEqual(500);
  });
});
