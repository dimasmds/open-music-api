import SongUpdate from '../SongUpdate';
import SongRepository from '../../repository/SongRepository';
import AlbumRepository from '../../../albums/repository/AlbumRepository';

describe('SongUpdate', () => {
  const mockSongRepository = <SongRepository>{};
  const mockAlbumRepository = <AlbumRepository>{};
  const songUpdate = new SongUpdate(mockSongRepository, mockAlbumRepository);

  describe('create', () => {
    it('should throw error when payload not contain title', async () => {
      await expect(songUpdate.create({})).rejects.toThrowError('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_TITLE');
    });

    it('should throw error when title not string', async () => {
      await expect(songUpdate.create({ title: 123 })).rejects.toThrowError('SONG_UPDATE.TITLE_NOT_STRING');
    });

    it('should throw error when payload not contain year', async () => {
      await expect(songUpdate.create({ title: 'Fix you' })).rejects.toThrowError('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_YEAR');
    });

    it('should throw error when year not number', async () => {
      await expect(songUpdate.create({ title: 'Fix you', year: 'abc' })).rejects.toThrowError('SONG_UPDATE.YEAR_NOT_NUMBER');
    });

    it('should throw error when year is decimal', async () => {
      await expect(songUpdate.create({ title: 'Fix you', year: 123.2 })).rejects.toThrowError('SONG_UPDATE.YEAR_SHOULD_NOT_DECIMAL');
    });

    it('should throw error when payload not contain genre', async () => {
      await expect(songUpdate.create({ title: 'Fix you', year: 2000 })).rejects.toThrowError('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_GENRE');
    });

    it('should throw error when genre is not string', async () => {
      await expect(songUpdate.create({ title: 'Fix you', year: 2000, genre: 123 })).rejects.toThrowError('SONG_UPDATE.GENRE_NOT_STRING');
    });

    it('should throw error when payload not contain performer', async () => {
      await expect(songUpdate.create({ title: 'Fix you', year: 2000, genre: 'pop' })).rejects.toThrowError('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_PERFORMER');
    });

    it('should throw error when performer not string', async () => {
      await expect(songUpdate.create({
        title: 'Fix you', year: 2000, genre: 'pop', performer: 123,
      })).rejects.toThrowError('SONG_UPDATE.PERFORMER_NOT_STRING');
    });

    it('should throw error when payload not contain id', async () => {
      await expect(songUpdate.create({
        title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay',
      })).rejects.toThrowError('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_ID');
    });

    it('should throw error when id not string', async () => {
      await expect(songUpdate.create({
        title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', id: 123,
      })).rejects.toThrowError('SONG_UPDATE.ID_NOT_STRING');
    });

    it('should throw error when id not valid', async () => {
      mockSongRepository.isSongValid = jest.fn(() => Promise.resolve(false));

      await expect(songUpdate.create({
        title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', id: 'song-123',
      })).rejects.toThrowError('SONG_UPDATE.ID_NOT_VALID');
      expect(mockSongRepository.isSongValid).toBeCalledWith('song-123');
    });

    it('should create SongUpdate correctly', async () => {
      mockSongRepository.isSongValid = jest.fn(() => Promise.resolve(true));
      const payload = {
        title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', id: 'song-123',
      };

      const createdSongUpdate = await songUpdate.create(payload);

      expect(createdSongUpdate).toBeInstanceOf(SongUpdate);
      expect(createdSongUpdate.id).toEqual(payload.id);
      expect(createdSongUpdate.title).toEqual(payload.title);
      expect(createdSongUpdate.year).toEqual(payload.year);
      expect(createdSongUpdate.genre).toEqual(payload.genre);
      expect(createdSongUpdate.performer).toEqual(payload.performer);
      expect(createdSongUpdate.duration).toEqual(null);
      expect(createdSongUpdate.albumId).toEqual(null);
    });

    describe('when duration is defined', () => {
      it('should throw error when duration is not number', async () => {
        await expect(songUpdate.create({
          title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', id: 'song-123', duration: 'hello',
        })).rejects.toThrowError('SONG_UPDATE.DURATION_NOT_STRING');
      });

      it('should create song update correctly', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          id: 'song-123',
          duration: 123,
        };

        const createdSongUpdate = await songUpdate.create(payload);

        expect(createdSongUpdate).toBeInstanceOf(SongUpdate);
        expect(createdSongUpdate.id).toEqual(payload.id);
        expect(createdSongUpdate.title).toEqual(payload.title);
        expect(createdSongUpdate.year).toEqual(payload.year);
        expect(createdSongUpdate.genre).toEqual(payload.genre);
        expect(createdSongUpdate.performer).toEqual(payload.performer);
        expect(createdSongUpdate.duration).toEqual(payload.duration);
        expect(createdSongUpdate.albumId).toEqual(null);
      });
    });

    describe('when albumId is defined', () => {
      it('should throw error when albumId not string', async () => {
        await expect(songUpdate.create({
          title: 'Fix you', year: 2000, genre: 'pop', performer: 'Coldplay', id: 'song-123', albumId: 123,
        })).rejects.toThrowError('SONG_UPDATE.ALBUM_ID_NOT_STRING');
      });

      it('should throw error when album id not valid', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          id: 'song-123',
          albumId: 'album-123',
        };
        mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(false));

        await expect(songUpdate.create(payload)).rejects.toThrowError('SONG_UPDATE.ALBUM_NOT_VALID');
      });

      it('should create song update correctly', async () => {
        const payload = {
          title: 'Fix you',
          year: 2000,
          genre: 'pop',
          performer: 'Coldplay',
          id: 'song-123',
          albumId: 'album-123',
        };
        mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));

        const createdSongUpdate = await songUpdate.create(payload);

        expect(createdSongUpdate).toBeInstanceOf(SongUpdate);
        expect(createdSongUpdate.id).toEqual(payload.id);
        expect(createdSongUpdate.title).toEqual(payload.title);
        expect(createdSongUpdate.year).toEqual(payload.year);
        expect(createdSongUpdate.genre).toEqual(payload.genre);
        expect(createdSongUpdate.performer).toEqual(payload.performer);
        expect(createdSongUpdate.albumId).toEqual(payload.albumId);
      });
    });
  });
});
