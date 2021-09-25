import createServer from '../createServer';
import container from '../../container/container';
import ServerTestHelper from './helper/ServerTestHelper';
import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import pool from '../../database/postgres/pool';

describe('when /authentications', () => {
  jest.setTimeout(20000);

  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST', () => {
    it('should response 201 with access and refresh token', async () => {
      // Arrange
      await ServerTestHelper.userCreation({ username: 'dimasmds', password: 'secret' });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/authentications',
        payload: {
          username: 'dimasmds',
          password: 'secret',
        },
      });

      // Assert
      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responsePayload.status).toEqual('success');
      expect(responsePayload.data.accessToken).toBeTruthy();
      expect(typeof responsePayload.data.accessToken).toEqual('string');
      expect(responsePayload.data.refreshToken).toBeTruthy();
      expect(typeof responsePayload.data.refreshToken).toEqual('string');
    });
  });

  describe('when PUT', () => {
    it('should response 200 with new access token', async () => {
      // Arrange
      const { data: { refreshToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds', password: 'secret' });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/authentications',
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responsePayload.status).toEqual('success');
      expect(responsePayload.data.accessToken).toBeTruthy();
      expect(typeof responsePayload.data.accessToken).toEqual('string');
    });
  });

  describe('when DELETE', () => {
    it('should response 200 with message', async () => {
      // Arrange
      const { data: { refreshToken } } = await ServerTestHelper.createUserAndLogin();
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/authentications',
        payload: {
          refreshToken,
        },
      });

      // Assert
      const responsePayload = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responsePayload.status).toEqual('success');
      expect(responsePayload.message).toEqual('you have logged out');
    });
  });
});
