import SongsTableTestHelper from '../../repository/_test/_helper/SongsTableTestHelper';
import AlbumsTableTestHelper from '../../repository/_test/_helper/AlbumsTableTestHelper';
import pool from '../../database/postgres/pool';
import createServer from '../createServer';
import container from '../../container/container';

describe('when /songs', () => {
  beforeEach(async () => {
    await SongsTableTestHelper.cleanTable();
    await AlbumsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /songs', () => {
    it('should response 201 and song id', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/songs',
        payload: {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.songId).toBeTruthy();
    });
  });

  describe('GET /songs', () => {
    it('should response 200 and return all songs', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await SongsTableTestHelper.addSong({ id: 'song-124' });
      await SongsTableTestHelper.addSong({ id: 'song-125' });

      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/songs',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.songs).toHaveLength(3);
    });
  });

  describe('GET /songs/{id}', () => {
    it('should response 200 and return detail songs', async () => {
      await SongsTableTestHelper.addSong({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'GET',
        url: '/songs/song-123',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.song.id).toEqual('song-123');
    });
  });

  describe('PUT /songs/{id}', () => {
    it('should response 200', async () => {
      await SongsTableTestHelper.addSong({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'PUT',
        url: '/songs/song-123',
        payload: {
          title: 'Speed of sound',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
        },
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.message).toEqual('song updated');
    });
  });

  describe('DELETE /songs/{id}', () => {
    it('should response 200', async () => {
      await SongsTableTestHelper.addSong({});
      const server = await createServer(container);

      const response = await server.inject({
        method: 'DELETE',
        url: '/songs/song-123',
      });

      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.message).toEqual('song deleted');
    });
  });
});
