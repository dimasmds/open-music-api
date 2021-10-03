import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import SongRepository from '../../../../Domains/songs/repository/SongRepository';
import SongCreationUseCase from '../SongCreationUseCase';

describe('SongCreationUseCase', () => {
  const mockAlbumRepository = <AlbumRepository>{};
  const mockSongRepository = <SongRepository>{};

  const songCreationUseCase = new SongCreationUseCase({
    albumRepository: mockAlbumRepository,
    songRepository: mockSongRepository,
  });

  it('should orchestrating flow correctly', async () => {
    const payload = {
      title: 'Fix you',
      year: 2000,
      genre: 'pop',
      performer: 'Coldplay',
      albumId: 'album-123',
    };

    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));
    mockSongRepository.persist = jest.fn(() => Promise.resolve('song-123'));

    // Action
    const userId = await songCreationUseCase.execute(payload);

    // Assert
    expect(userId).toEqual('song-123');
    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
    expect(mockSongRepository.persist).toBeCalled();
  });
});
