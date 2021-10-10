import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';

class DeletePlaylistUseCase {
  private playlistRepository: PlaylistRepository;

  constructor({ playlistRepository }: UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
  }

  async execute(payload: any = {}) {
    await DeletePlaylistUseCase.verifyPayload(payload);

    const { playlistId, userId } = payload;

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('DELETE_PLAYLIST.PLAYLIST_NOT_FOUND');
    }

    const isAnOwnerPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (!isAnOwnerPlaylist) {
      throw new Error('DELETE_PLAYLIST.USER_NOT_OWNED_PLAYLIST');
    }

    await this.playlistRepository.deletePlaylist(playlistId);
  }

  private static verifyPayload({ playlistId, userId }: any) {
    if (!playlistId) {
      throw new Error('DELETE_PLAYLIST.NOT_CONTAIN_PLAYLIST_ID');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('DELETE_PLAYLIST.PLAYLIST_ID_NOT_STRING');
    }

    if (!userId) {
      throw new Error('DELETE_PLAYLIST.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('DELETE_PLAYLIST.USER_ID_NOT_STRING');
    }
  }
}

export default DeletePlaylistUseCase;
