import AlbumCreation from '../AlbumCreation';

describe('AlbumCreation', () => {
  const albumCreation = new AlbumCreation();

  describe('create', () => {
    it('should throw error when payload not contain name ', async () => {
      await expect(albumCreation.create({})).rejects.toThrowError('ALBUM_CREATION.NOT_CONTAIN_NAME');
    });

    it('should throw error when name not string', async () => {
      await expect(albumCreation.create({ name: 123 })).rejects.toThrowError('ALBUM_CREATION.NAME_NOT_STRING');
    });

    it('should throw error when payload not contain year', async () => {
      await expect(albumCreation.create({ name: 'Viva la vida' })).rejects.toThrowError('ALBUM_CREATION.NOT_CONTAIN_YEAR');
    });

    it('should throw error when year not number', async () => {
      await expect(albumCreation.create({ name: 'Viva la vida', year: '123' })).rejects.toThrowError('ALBUM_CREATION.YEAR_NOT_NUMBER');
    });

    it('should throw error when number is decimal', async () => {
      await expect(albumCreation.create({ name: 'Viva la vida', year: 123.2 })).rejects.toThrowError('ALBUM_CREATION.YEAR_CANNOT_DECIMAL');
    });

    it('should create AlbumCreation correctly', async () => {
      const payload = {
        name: 'Viva la vida',
        year: 2001,
      };

      const createdAlbumCreation = await albumCreation.create(payload);

      expect(createdAlbumCreation).toBeInstanceOf(AlbumCreation);
      expect(createdAlbumCreation.name).toEqual(payload.name);
      expect(createdAlbumCreation.year).toEqual(payload.year);
    });
  });
});
