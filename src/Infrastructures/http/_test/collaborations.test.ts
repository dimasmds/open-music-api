import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import PlaylistsTableTestHelper from '../../repository/_test/_helper/PlaylistsTableTestHelper';
import CollaborationsTableTestHelper
  from '../../repository/_test/_helper/CollaborationsTableTestHelper';
import ServerTestHelper from './helper/ServerTestHelper';
import createServer from '../createServer';
import container from '../../container/container';

describe('when /collaborations', () => {
  jest.setTimeout(30000);
  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
    await CollaborationsTableTestHelper.cleanTable();
  });

  describe('when POST /collaborations', () => {
    it('should response 201 and collaboration id', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'Dimas Playlist', accessToken });
      await UsersTableTestHelper.addUser({ id: 'user-456', username: 'rafael' });
      const server = await createServer(container);
      const payload = {
        playlistId,
        userId: 'user-456',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/collaborations',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(201);
      expect(responseJson.status).toBe('success');
      expect(responseJson.data).toHaveProperty('collaborationId');
    });
  });

  describe('when DELETE /collaborations', () => {
    it('should response 200 and correct message', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'Dimas Playlist', accessToken });
      await UsersTableTestHelper.addUser({ id: 'user-456', username: 'rafael' });
      await CollaborationsTableTestHelper.addCollaboration({
        playlistId,
        userId: 'user-456',
      });
      const server = await createServer(container);
      const payload = {
        playlistId,
        userId: 'user-456',
      };

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/collaborations',
        payload,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toBe('success');
      expect(responseJson.message).toBe('Collaboration deleted');
    });
  });
});
