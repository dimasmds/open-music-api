// TODO: not test yet!
import PlaylistRepository from '../../playlists/repository/PlaylistRepository';
import UserRepository from '../../users/repository/UserRepository';

class CollaborationDeletion {
  private playlistRepository: PlaylistRepository;

  private userRepository: UserRepository;

  public userId: string;

  public playlistId: string;

  constructor(playlistRepository: PlaylistRepository, userRepository: UserRepository) {
    this.playlistRepository = playlistRepository;
    this.userRepository = userRepository;
  }

  async delete(payload: any = {}) {
    CollaborationDeletion.verifyPayload(payload);

    const { userId, playlistId, ownerId } = payload;

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('COLLABORATION_DELETION_PLAYLIST_NOT_FOUND');
    }

    const isValidOwner = await this.playlistRepository.isAnOwnerPlaylist(playlistId, ownerId);

    if (!isValidOwner) {
      throw new Error('COLLABORATION_DELETION.AUTH_USER_IS_NOT_OWNER');
    }

    this.userId = userId;
    this.playlistId = playlistId;

    return this;
  }

  private static verifyPayload(payload: any) {
    const { playlistId, userId, ownerId } = payload;

    if (!playlistId) {
      throw new Error('COLLABORATION_DELETION.PLAYLIST_ID_REQUIRED');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('COLLABORATION_DELETION.PLAYLIST_ID_SHOULD_BE_STRING');
    }

    if (!userId) {
      throw new Error('COLLABORATION_DELETION.USER_ID_REQUIRED');
    }

    if (typeof userId !== 'string') {
      throw new Error('COLLABORATION_DELETION.USER_ID_SHOULD_BE_STRING');
    }

    if (!ownerId) {
      throw new Error('COLLABORATION_DELETION.OWNER_ID_REQUIRED');
    }

    if (typeof ownerId !== 'string') {
      throw new Error('COLLABORATION_DELETION.OWNER_ID_SHOULD_BE_STRING');
    }
  }
}

export default CollaborationDeletion;
