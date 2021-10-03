import SongRepository from '../../../../Domains/songs/repository/SongRepository';
import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import GetAlbumDetailUseCase from '../GetAlbumDetailUseCase';
import AlbumDetail from '../../../../Domains/albums/entities/AlbumDetail';
import Song from '../../../../Domains/songs/entities/Song';

describe('GetAlbumDetailUseCase', () => {
  const mockSongRepository = <SongRepository>{};
  const mockAlbumRepository = <AlbumRepository>{};

  const getAlbumDetailUseCase = new GetAlbumDetailUseCase({
    songRepository: mockSongRepository,
    albumRepository: mockAlbumRepository,
  });

  it('should throw error when not contain album id', async () => {
    await expect(getAlbumDetailUseCase.execute({})).rejects.toThrowError('GET_ALBUM.NOT_CONTAIN_ID');
  });

  it('should throw error when album id not string', async () => {
    await expect(getAlbumDetailUseCase.execute({ id: 123 })).rejects.toThrowError('GET_ALBUM.ID_NOT_STRING');
  });

  it('should throw error when album is not found', async () => {
    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(false));

    await expect(getAlbumDetailUseCase.execute({ id: 'album-123' })).rejects.toThrowError('GET_ALBUM.ALBUM_NOT_FOUND');
    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
  });

  it('should return DetailAlbum correctly', async () => {
    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));
    const expectedSongs: Song[] = [
      new Song({ id: 'song-123', title: 'Viva la vida', performer: 'Coldplay' }),
      new Song({ id: 'song-124', title: 'fix you', performer: 'Coldplay' }),
    ];
    const expectedAlbum = new AlbumDetail({
      id: 'album-123', name: 'Viva la vida', year: 2000, songs: expectedSongs,
    });

    mockSongRepository.getSongsInAlbum = jest.fn(() => Promise.resolve(expectedSongs));
    mockAlbumRepository.getAlbumById = jest.fn(() => Promise.resolve(expectedAlbum));

    // Action
    const album = await getAlbumDetailUseCase.execute({ id: 'album-123' });

    // Assert
    expect(album).toEqual(expectedAlbum);
    expect(mockSongRepository.getSongsInAlbum).toBeCalledWith('album-123');
    expect(mockAlbumRepository.getAlbumById).toBeCalledWith('album-123');
  });
});
