import createServer from '../createServer';

describe('createServer', () => {
  it('should return Hello World when GET /', async () => {
    // Arrange
    const server = await createServer();

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
});
