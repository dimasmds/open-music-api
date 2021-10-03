import AlbumUpdate from '../AlbumUpdate';
import AlbumRepository from '../../repository/AlbumRepository';

describe('AlbumUpdate', () => {
  const mockAlbumRepository = <AlbumRepository>{};
  const albumUpdate = new AlbumUpdate(mockAlbumRepository);

  describe('create', () => {
    it('should throw error when payload not contain id', async () => {
      await expect(albumUpdate.create({})).rejects.toThrowError('ALBUM_UPDATE.NOT_CONTAIN_ID');
    });

    it('should throw error when id not string', async () => {
      await expect(albumUpdate.create({ id: 123 })).rejects.toThrowError('ALBUM_UPDATE.ID_NOT_STRING');
    });

    it('should throw error when payload not contain name', async () => {
      await expect(albumUpdate.create({ id: 'album-123' })).rejects.toThrowError('ALBUM_UPDATE.NOT_CONTAIN_NAME');
    });

    it('should throw error when name not string', async () => {
      await expect(albumUpdate.create({ id: 'album-123', name: 123 })).rejects.toThrowError('ALBUM_UPDATE.NAME_NOT_STRING');
    });

    it('should throw error when payload not contain year', async () => {
      await expect(albumUpdate.create({ id: 'album-123', name: 'Viva la vida' })).rejects.toThrowError('ALBUM_UPDATE.NOT_CONTAIN_YEAR');
    });

    it('should throw error when year is not number', async () => {
      await expect(albumUpdate.create({ id: 'album-123', name: 'Viva la vida', year: true })).rejects.toThrowError('ALBUM_UPDATE.YEAR_NOT_NUMBER');
    });

    it('should throw error when year is decimal', async () => {
      await expect(albumUpdate.create({ id: 'album-123', name: 'Viva la vida', year: 12.3 })).rejects.toThrowError('ALBUM_UPDATE.SHOULD_NOT_DECIMAL');
    });

    it('should throw error when id is not valid', async () => {
      mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(false));

      await expect(albumUpdate.create({ id: 'album-123', name: 'Viva la vida', year: 2000 })).rejects.toThrowError('ALBUM_UPDATE.ID_NOT_VALID');
      expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
    });

    it('should create instance correctly', async () => {
      mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));

      const payload = { id: 'album-123', name: 'Viva la vida', year: 2000 };

      const createdAlbumUpdate = await albumUpdate.create(payload);

      expect(createdAlbumUpdate).toBeInstanceOf(AlbumUpdate);
      expect(createdAlbumUpdate.id).toEqual(payload.id);
      expect(createdAlbumUpdate.name).toEqual(payload.name);
      expect(createdAlbumUpdate.year).toEqual(payload.year);
    });
  });
});
