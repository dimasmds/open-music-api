import pool from '../../database/postgres/pool';
import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import createServer from '../createServer';
import container from '../../container/container';

describe('when /users', () => {
  beforeEach(async () => {
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
      const server = await createServer(container);

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
  });
});
