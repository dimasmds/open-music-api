import UserRepository from '../../../../Domains/users/repository/UserRepository';
import PlaylistRepository from '../../../../Domains/playlists/repository/PlaylistRepository';
import GetPlaylistsUseCase from '../GetPlaylistsUseCase';
import Playlist from '../../../../Domains/playlists/entities/Playlist';

describe('GetPlaylistsUseCase', () => {
  const mockUserRepository = <UserRepository>{};
  const mockPlaylistRepository = <PlaylistRepository>{};

  const getPlaylistUseCase = new GetPlaylistsUseCase({
    userRepository: mockUserRepository,
    playlistRepository: mockPlaylistRepository,
  });

  it('should throw error when payload not contain user id', async () => {
    await expect(getPlaylistUseCase.execute({}))
      .rejects
      .toThrow('GET_PLAYLIST.NOT_CONTAIN_USER_ID');
  });

  it('should throw error when user id not string', async () => {
    await expect(getPlaylistUseCase.execute({ userId: 123 }))
      .rejects
      .toThrow('GET_PLAYLIST.USER_ID_NOT_STRING');
  });

  it('should throw error when user id not valid', async () => {
    mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(false));
    await expect(getPlaylistUseCase.execute({ userId: 'user-123' }))
      .rejects
      .toThrow('GET_PLAYLIST.USER_ID_NOT_VALID');

    expect(mockUserRepository.isUserIdValid).toBeCalledWith('user-123');
  });

  it('should orchestrating flow correctly', async () => {
    const expectedPlaylists = [
      new Playlist('playlist-123', 'Viva la vida', 'dimasmds'),
      new Playlist('playlist-122', 'Fix you', 'dimasmds'),
      new Playlist('playlist-121', 'Speed of Sound', 'dimasmds'),
    ];
    mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));
    mockPlaylistRepository.getPlaylists = jest.fn(() => Promise.resolve(expectedPlaylists));

    const playlists = await getPlaylistUseCase.execute({ userId: 'user-123' });

    expect(playlists).toStrictEqual(expectedPlaylists);
    expect(mockPlaylistRepository.getPlaylists).toBeCalledWith('user-123');
  });
});
