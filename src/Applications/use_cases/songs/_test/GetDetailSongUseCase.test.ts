import SongRepository from '../../../../Domains/songs/repository/SongRepository';
import GetDetailSongUseCase from '../GetDetailSongUseCase';

describe('GetDetailSongUseCase', () => {
  const mockSongRepository = <SongRepository>{};
  const getDetailSongUseCase = new GetDetailSongUseCase({
    songRepository: mockSongRepository,
  });

  it('should throw error when payload not contain id', async () => {
    const payload = {};

    // Action & Assert
    await expect(getDetailSongUseCase.execute(payload)).rejects.toThrowError('GET_DETAIL_SONG.ID_NOT_DEFINED');
  });

  it('should throw error when id not string', async () => {
    const payload = {
      id: 123,
    };

    // Action & Assert
    await expect(getDetailSongUseCase.execute(payload)).rejects.toThrowError('GET_DETAIL_SONG.ID_NOT_STRING');
  });

  it('should throw error when song not found', async () => {
    const payload = {
      id: 'song-123',
    };

    mockSongRepository.getSongById = jest.fn(() => null);

    await expect(getDetailSongUseCase.execute(payload)).rejects.toThrowError('GET_DETAIL_SONG.SONG_NOT_FOUND');
  });

  it('should orchestrating flow correctly', async () => {
    const payload = {
      id: 'song-123',
    };
    const expectedSong = {
      id: 'song-123',
      title: 'Viva la vida',
      year: 2008,
      performer: 'Coldplay',
      genre: 'Indie',
      duration: 120,
      albumId: 'album-123',
    };

    mockSongRepository.getSongById = jest.fn(() => Promise.resolve(expectedSong));

    // Action
    const song = await getDetailSongUseCase.execute(payload);

    // Assert
    expect(song).toEqual(expectedSong);
    expect(mockSongRepository.getSongById).toBeCalledWith(payload.id);
  });
});
