import SongCreation from '../SongCreation';
import AlbumRepository from '../../../albums/repository/AlbumRepository';

describe('SongCreation', () => {
  const mockAlbumRepository = <AlbumRepository> {};
  const songCreation = new SongCreation(mockAlbumRepository);

  describe('create', () => {
    it('should throw error when payload not contain title', async () => {
      await expect(songCreation.create({})).rejects.toThrowError('SONG_CREATION.PAYLOAD_NOT_CONTAIN_TITLE');
    });

    it('should throw error when title not string', async () => {
      await expect(songCreation.create({ title: 123 })).rejects.toThrowError('SONG_CREATION.TITLE_NOT_STRING');
    });

    it('should throw error when payload not contain year', async () => {
      await expect(songCreation.create({ title: 'Fix you' })).rejects.toThrowError('SONG_CREATION.PAYLOAD_NOT_CONTAIN_YEAR');
    });

    it('should throw error when year not number', async () => {
      await expect(songCreation.create({ title: 'Fix you', year: 'abc' })).rejects.toThrowError('SONG_CREATION.YEAR_NOT_NUMBER');
    });

    it('should throw error when year is decimal', async () => {
      await expect(songCreation.create({ title: 'Fix you', year: 123.2 })).rejects.toThrowError('SONG_CREATION.YEAR_SHOULD_NOT_DECIMAL');
    });

    it('should throw error when payload not contain genre', async () => {
      await expect(songCreation.create({ title: 'Fix you', year: 2000 })).rejects.toThrowError('SONG_CREATION.PAYLOAD_NOT_CONTAIN_GENRE');
    });

    it('should throw error when genre is not string', async () => {
      await expect(songCreation.create({ title: 'Fix you', year: 2000, genre: 123 })).rejects.toThrowError('SONG_CREATION.GENRE_NOT_STRING');
    });

    it('should throw error when payload not contain performer', async () => {
      await expect(songCreation.create({ title: 'Fix you', year: 2000, genre: 'pop' })).rejects.toThrowError('SONG_CREATION.PAYLOAD_NOT_CONTAIN_PERFORMER');
    });

    it('should throw error when performer not string', async () => {
      await expect(songCreation.create({
        title: 'Fix you', year: 2000, genre: 'pop', performer: 123,
      })).rejects.toThrowError('SONG_CREATION.PERFORMER_NOT_STRING');
    });

    it('should create song creation correctly', async () => {
      const payload = {
        title: 'Fix you',
        year: 2000,
        genre: 'pop',
        performer: 'Coldplay',
      };

      const createdSongCreation = await songCreation.create(payload);

      expect(createdSongCreation).toBeInstanceOf(SongCreation);
      expect(createdSongCreation.title).toEqual(payload.title);
      expect(createdSongCreation.year).toEqual(payload.year);
      expect(createdSongCreation.genre).toEqual(payload.genre);
      expect(createdSongCreation.performer).toEqual(payload.performer);
      expect(createdSongCreation.duration).toEqual(null);
      expect(createdSongCreation.albumId).toEqual(null);
    });

    describe('when duration is defined', () => {
      it('should throw error when duration is not number', async () => {
        await expect(songCreation.create({
          title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', duration: 'hello',
        })).rejects.toThrowError('SONG_CREATION.DURATION_NOT_STRING');
      });

      it('should create song creation correctly', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          duration: 123,
        };

        const createdSongCreation = await songCreation.create(payload);

        expect(createdSongCreation).toBeInstanceOf(SongCreation);
        expect(createdSongCreation.title).toEqual(payload.title);
        expect(createdSongCreation.year).toEqual(payload.year);
        expect(createdSongCreation.genre).toEqual(payload.genre);
        expect(createdSongCreation.performer).toEqual(payload.performer);
        expect(createdSongCreation.duration).toEqual(payload.duration);
        expect(createdSongCreation.albumId).toEqual(null);
      });
    });

    describe('when albumId is defined', () => {
      it('should throw error when albumId not string', async () => {
        await expect(songCreation.create({
          title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', albumId: 123,
        })).rejects.toThrowError('SONG_CREATION.ALBUM_ID_NOT_STRING');
      });

      it('should throw error when album id not valid', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          albumId: 'album-123',
        };
        mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(false));

        await expect(songCreation.create(payload)).rejects.toThrowError('SONG_CREATION.ALBUM_NOT_VALID');
      });

      it('should create song creation correctly', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          albumId: 'album-123',
        };
        mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));

        const createdSongCreation = await songCreation.create(payload);

        expect(createdSongCreation).toBeInstanceOf(SongCreation);
        expect(createdSongCreation.title).toEqual(payload.title);
        expect(createdSongCreation.year).toEqual(payload.year);
        expect(createdSongCreation.genre).toEqual(payload.genre);
        expect(createdSongCreation.performer).toEqual(payload.performer);
        expect(createdSongCreation.albumId).toEqual(payload.albumId);
      });
    });
  });
});
