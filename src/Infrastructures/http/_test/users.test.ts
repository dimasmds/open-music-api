import { Server } from '@hapi/hapi';
import pool from '../../database/postgres/pool';
import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import createServer from '../createServer';
import container from '../../container/container';

describe('when /users', () => {
  jest.setTimeout(20000);
  let server: Server;

  beforeEach(async () => {
    server = await createServer(container);
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST', () => {
    it('should response 201 when request correctly', async () => {
      // Arrange
      const requestPayload = {
        username: 'dimasmds',
        password: 'secret',
        fullname: 'Dimas Maulana',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.userId).toBeTruthy();
      expect(typeof responseJson.data.userId).toEqual('string');
    });

    it('should response 400 when request not contain username', async () => {
      // Arrange
      const requestPayload = {
        password: 'secret',
        fullname: 'Dimas Maulana',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/users',
        payload: requestPayload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(400);
      expect(responseJson.status).toEqual('fail');
      expect(responseJson.message).toBeTruthy();
    });
  });
});
