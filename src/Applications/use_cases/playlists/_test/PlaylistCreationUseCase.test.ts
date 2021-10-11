import UserRepository from '../../../../Domains/users/repository/UserRepository';
import PlaylistRepository from '../../../../Domains/playlists/repository/PlaylistRepository';
import PlaylistCreationUseCase from '../PlaylistCreationUseCase';
import PlaylistCreation from '../../../../Domains/playlists/entities/PlaylistCreation';

describe('PlaylistCreationUseCase', () => {
  const fakeUserRepository = <UserRepository>{};
  fakeUserRepository.isUserIdValid = () => Promise.resolve(true); // stubbing!

  const mockPlaylistRepository = <PlaylistRepository>{};
  mockPlaylistRepository.persist = jest.fn(() => Promise.resolve('playlist-123')); // mocking!

  const playlistCreationUseCase = new PlaylistCreationUseCase({
    playlistRepository: mockPlaylistRepository,
    userRepository: fakeUserRepository,
  });

  it('should orchestrating flow correctly', async () => {
    const payload = {
      name: 'Viva la vida',
      userId: 'user-123',
    };

    // Action
    const playlistId = await playlistCreationUseCase.execute(payload);

    expect(playlistId).toEqual('playlist-123');
    expect(mockPlaylistRepository.persist)
      .toBeCalledWith(await new PlaylistCreation(fakeUserRepository).create(payload));
  });
});
