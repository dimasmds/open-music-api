import createServer from '../createServer';
import container from '../../container/container';
import AlbumsTableTestHelper from '../../repository/_test/_helper/AlbumsTableTestHelper';
import SongsTableTestHelper from '../../repository/_test/_helper/SongsTableTestHelper';
import pool from '../../database/postgres/pool';

describe('when /albums', () => {
  beforeEach(async () => {
    await AlbumsTableTestHelper.cleanTable();
    await SongsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('when POST', () => {
    it('should response 201 and response album id', async () => {
      const server = await createServer(container);

      const response = await server.inject({
        method: 'POST',
        url: '/albums',
        payload: {
          name: 'Viva la vida',
          year: 2000,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(201);
      expect(responseJson.status).toEqual('success');
      expect(typeof responseJson.data.albumId).toEqual('string');
      expect(responseJson.data.albumId).toBeTruthy();
    });
  });

  describe('when GET', () => {
    it('should response 200 and detail album', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-123' });
      await SongsTableTestHelper.addSong({ albumId: 'album-123' });
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'GET',
        url: '/albums/album-123',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.data.album.id).toEqual('album-123');
      expect(responseJson.data.album.name).toEqual('Viva la vida');
      expect(responseJson.data.album.year).toEqual(2000);
      expect(responseJson.data.album.songs).toHaveLength(1);
    });
  });

  describe('when PUT', () => {
    it('should response 200', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'PUT',
        url: '/albums/album-123',
        payload: {
          name: 'Dudu',
          year: 2000,
        },
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.message).toEqual('album update success');
    });
  });

  describe('when DELETE', () => {
    it('should response 200', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({});
      const server = await createServer(container);

      // Action
      const response = await server.inject({
        method: 'DELETE',
        url: '/albums/album-123',
      });

      // Assert
      const responseJson = JSON.parse(response.payload);
      expect(response.statusCode).toEqual(200);
      expect(responseJson.status).toEqual('success');
      expect(responseJson.message).toEqual('album delete success');
    });
  });
});
