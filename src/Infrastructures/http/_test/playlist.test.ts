import AlbumsTableTestHelper from '../../repository/_test/_helper/AlbumsTableTestHelper';
import SongsTableTestHelper from '../../repository/_test/_helper/SongsTableTestHelper';
import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import PlaylistsTableTestHelper from '../../repository/_test/_helper/PlaylistsTableTestHelper';
import ServerTestHelper from './helper/ServerTestHelper';
import createServer from '../createServer';
import container from '../../container/container';

describe('when /playlists', () => {
  jest.setTimeout(20000);
  beforeEach(async () => {
    await AlbumsTableTestHelper.cleanTable();
    await SongsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
  });

  describe('when POST /playlist', () => {
    it('should return 201 and playlist id', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const payload = {
        name: 'My Playlist',
      };
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'POST',
        url: '/playlists',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.playlistId).toBeDefined();
    });
  });

  describe('when GET /playlists', () => {
    it('should response 200 and all playlists user owned', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      await ServerTestHelper.createPlaylist({ name: 'My Playlist 2', accessToken });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/playlists',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.playlists.length).toBe(2);
      const [playlist1, playlist2] = responseJson.data.playlists;
      expect(playlist1.name).toEqual('My Playlist');
      expect(playlist2.name).toEqual('My Playlist 2');
    });
  });

  describe('when DELETE /playlists/{id}', () => {
    it('should response 200 and correct message', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/playlists/${playlistId}`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.message).toEqual('Playlist deleted');
    });
  });
  describe('when POST /playlists/{id}/songs', () => {
    it('should response 201 and correct message', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      const server = await createServer(container);
      const payload = {
        songId: 'song-123',
      };

      // Action
      const response = await server.inject({
        method: 'POST',
        url: `/playlists/${playlistId}/songs`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload,
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.message).toEqual('Song added to playlist');
    });
  });
});
