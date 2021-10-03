import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import SongRepository from '../../../../Domains/songs/repository/SongRepository';
import UpdateSongUseCase from '../UpdateSongUseCase';

describe('UpdateSongUseCase', () => {
  const mockAlbumRepository = <AlbumRepository>{};
  const mockSongRepository = <SongRepository>{};

  const updateSongUseCase = new UpdateSongUseCase({
    albumRepository: mockAlbumRepository,
    songRepository: mockSongRepository,
  });

  it('should orchestrating flow correctly', async () => {
    const payload = {
      title: 'Fix you',
      year: 2000,
      genre: 'pop',
      performer: 'Coldplay',
      id: 'song-123',
      albumId: 'album-123',
    };
    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));
    mockSongRepository.isSongValid = jest.fn(() => Promise.resolve(true));
    mockSongRepository.update = jest.fn(() => Promise.resolve());

    // Action
    await updateSongUseCase.execute(payload);

    // Assert
    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith(payload.albumId);
    expect(mockSongRepository.update).toBeCalled();
  });
});
