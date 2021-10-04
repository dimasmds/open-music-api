import AlbumRepositoryPostgres from '../AlbumRepositoryPostgres';
import pool from '../../database/postgres/pool';
import AlbumCreation from '../../../Domains/albums/entities/AlbumCreation';
import AlbumsTableTestHelper from './_helper/AlbumsTableTestHelper';
import AlbumDetail from '../../../Domains/albums/entities/AlbumDetail';
import AlbumUpdate from '../../../Domains/albums/entities/AlbumUpdate';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';

describe('AlbumRepositoryPostgres', () => {
  const fakeIdGenerator = () => '123';
  const albumRepositoryPostgres = new AlbumRepositoryPostgres({
    pool,
    idGenerator: fakeIdGenerator,
  });

  beforeEach(async () => {
    await AlbumsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('persist', () => {
    const album = new AlbumCreation();
    album.name = 'Viva la vida';
    album.year = 2020;

    it('should persist album correctly', async () => {
      // Action
      await albumRepositoryPostgres.persist(album);

      // Assert
      const albums = await AlbumsTableTestHelper.findAlbumsById('album-123');
      expect(albums).toHaveLength(1);
      expect(albums[0].name).toEqual(album.name);
      expect(albums[0].year).toEqual(album.year);
    });

    it('should return album id', async () => {
      // Action
      const albumId = await albumRepositoryPostgres.persist(album);

      // Assert
      expect(albumId).toEqual('album-123');
    });
  });

  describe('getAlbumById', () => {
    it('should return DetailAlbum correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-321', name: 'Fix you', year: 1995 });

      // Action
      const album = await albumRepositoryPostgres.getAlbumById('album-321');

      // Assert
      expect(album).toBeInstanceOf(AlbumDetail);
      expect(album.id).toEqual('album-321');
      expect(album.year).toEqual(1995);
      expect(album.name).toEqual('Fix you');
      expect(album.songs).toEqual(null);
    });
  });

  describe('updateAlbum', () => {
    it('should update the album correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-321', name: 'Fix you', year: 1995 });
      const albumUpdate = new AlbumUpdate(<AlbumRepository>{});
      albumUpdate.id = 'album-321';
      albumUpdate.name = 'Viva la vida';
      albumUpdate.year = 2000;

      // Action
      await albumRepositoryPostgres.updateAlbum(albumUpdate);

      // Assert
      const albums = await AlbumsTableTestHelper.findAlbumsById('album-321');
      expect(albums[0].id).toEqual('album-321');
      expect(albums[0].name).toEqual('Viva la vida');
      expect(albums[0].year).toEqual(2000);
    });
  });

  describe('isAlbumValid', () => {
    it('should return false when album id is not valid', async () => {
      const albumId = 'album-123';

      // Action
      const isValid = await albumRepositoryPostgres.isAlbumValid(albumId);

      // Arrange
      expect(isValid).toEqual(false);
    });

    it('should return true when album id is valid', async () => {
      const albumId = 'album-123';
      await AlbumsTableTestHelper.addAlbum({ id: albumId });

      // Action
      const isValid = await albumRepositoryPostgres.isAlbumValid(albumId);

      // Arrange
      expect(isValid).toEqual(true);
    });
  });

  describe('deleteAlbum', () => {
    it('should delete album correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-123' });

      // Action
      await albumRepositoryPostgres.deleteAlbum('album-123');

      // Assert
      const albums = await AlbumsTableTestHelper.findAlbumsById('album-123');
      expect(albums).toHaveLength(0);
    });
  });
});
