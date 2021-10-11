import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import UserRepository from '../../../Domains/users/repository/UserRepository';

class GetPlaylistsUseCase {
  private playlistRepository: PlaylistRepository;

  private userRepository: UserRepository;

  constructor({ playlistRepository, userRepository } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.userRepository = userRepository;
  }

  async execute(payload: any = {}) {
    GetPlaylistsUseCase.verifyPayload(payload);

    const { userId } = payload;

    const isUserValid = await this.userRepository.isUserIdValid(userId);

    if (!isUserValid) {
      throw new Error('GET_PLAYLIST.USER_ID_NOT_VALID');
    }

    return this.playlistRepository.getPlaylists(userId);
  }

  private static verifyPayload({ userId } : any) {
    if (!userId) {
      throw new Error('GET_PLAYLIST.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('GET_PLAYLIST.USER_ID_NOT_STRING');
    }
  }
}

export default GetPlaylistsUseCase;
