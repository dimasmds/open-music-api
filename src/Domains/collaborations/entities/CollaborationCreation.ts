import UserRepository from '../../users/repository/UserRepository';
import PlaylistRepository from '../../playlists/repository/PlaylistRepository';

class CollaborationCreation {
  private userRepository: UserRepository;

  private playlistRepository: PlaylistRepository;

  public userId: string;

  public playlistId: string;

  constructor(userRepository: UserRepository, playlistRepository: PlaylistRepository) {
    this.userRepository = userRepository;
    this.playlistRepository = playlistRepository;
  }

  async create(payload: any = {}) {
    CollaborationCreation.validatePayload(payload);

    const { userId, playlistId } = payload;
    const isUserValid = await this.userRepository.isUserIdValid(userId);

    if (!isUserValid) {
      throw new Error('COLLABORATION_CREATION.USER_NOT_FOUND');
    }

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('COLLABORATION_CREATION.PLAYLIST_NOT_FOUND');
    }

    const isAnOwnerPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (isAnOwnerPlaylist) {
      throw new Error('COLLABORATION_CREATION.USER_IS_PLAYLIST_OWNER');
    }

    this.userId = userId;
    this.playlistId = playlistId;

    return this;
  }

  private static validatePayload(payload: any) {
    const { playlistId, userId } = payload;

    if (!playlistId) {
      throw new Error('COLLABORATION_CREATION.PLAYLIST_ID_REQUIRED');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('COLLABORATION_CREATION.PLAYLIST_ID_SHOULD_BE_STRING');
    }

    if (!userId) {
      throw new Error('COLLABORATION_CREATION.USER_ID_REQUIRED');
    }

    if (typeof userId !== 'string') {
      throw new Error('COLLABORATION_CREATION.USER_ID_SHOULD_BE_STRING');
    }
  }
}

export default CollaborationCreation;
