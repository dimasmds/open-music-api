import AlbumsTableTestHelper from '../../repository/_test/_helper/AlbumsTableTestHelper';
import SongsTableTestHelper from '../../repository/_test/_helper/SongsTableTestHelper';
import UsersTableTestHelper from '../../repository/_test/_helper/UsersTableTestHelper';
import PlaylistsTableTestHelper from '../../repository/_test/_helper/PlaylistsTableTestHelper';
import ServerTestHelper from './helper/ServerTestHelper';
import createServer from '../createServer';
import container from '../../container/container';
import PlaylistSongsTableTestHelper
  from '../../repository/_test/_helper/PlaylistSongsTableTestHelper';
import pool from '../../database/postgres/pool';
import PlaylistActivitiesTableTestHelper
  from '../../repository/_test/_helper/PlaylistActivitiesTableTestHelper';

describe('when /playlists', () => {
  jest.setTimeout(20000);
  beforeEach(async () => {
    await AlbumsTableTestHelper.cleanTable();
    await SongsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
    await PlaylistActivitiesTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
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

  describe('when GET /playlists/{id}/songs', () => {
    it('should response 200 and return detail playlist with songs inside it', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await SongsTableTestHelper.addSong({ id: 'song-456' });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({ id: 'psongs-123', playlistId, songId: 'song-123' });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({ id: 'psongs-456', playlistId, songId: 'song-456' });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/playlists/${playlistId}/songs`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.playlist.name).toEqual('My Playlist');
      expect(responseJson.data.playlist.songs.length).toBe(2);
      const [song1, song2] = responseJson.data.playlist.songs;
      expect(song1.id).toEqual('song-123');
      expect(song2.id).toEqual('song-456');
    });
  });

  describe('when DELETE /playlists/{id}/songs', () => {
    it('should response 200 and correct message', async () => {
      // Arrange
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await SongsTableTestHelper.addSong({ id: 'song-456' });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({ id: 'psongs-123', playlistId, songId: 'song-123' });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: `/playlists/${playlistId}/songs`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        payload: {
          songId: 'song-123',
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.message).toEqual('Song removed from playlist');
    });
  });

  describe('when GET /playlists/{id}/activities', () => {
    it('should response 200 and all activities in playlist', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123', title: 'Song A' });
      await SongsTableTestHelper.addSong({ id: 'song-456', title: 'Song B' });
      const { data: { accessToken } } = await ServerTestHelper.createUserAndLogin({ username: 'dimasmds' });
      const { data: { playlistId } } = await ServerTestHelper.createPlaylist({ name: 'My Playlist', accessToken });
      await ServerTestHelper.addSongToPlaylist({ playlistId, songId: 'song-123', accessToken });
      await ServerTestHelper.addSongToPlaylist({ playlistId, songId: 'song-456', accessToken });
      await ServerTestHelper.removeSongFromPlaylist({ playlistId, songId: 'song-123', accessToken });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: `/playlists/${playlistId}/activities`,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      // Action
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toBe(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.playlistId).toBe(playlistId);
      expect(responseJson.data.activities.length).toBe(3);
      const [activity1, activity2, activity3] = responseJson.data.activities;
      expect(activity1.action).toBe('add');
      expect(activity1.title).toBe('Song A');
      expect(activity2.action).toBe('add');
      expect(activity2.title).toBe('Song B');
      expect(activity3.action).toBe('delete');
      expect(activity3.title).toBe('Song A');
    });
  });
});
