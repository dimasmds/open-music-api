import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';

class DeleteSongInPlaylistUseCase {
  private playlistRepository: PlaylistRepository;

  private activitiesRepository: ActivitiesRepository;

  constructor({ playlistRepository, activitiesRepository } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.activitiesRepository = activitiesRepository;
  }

  async execute(payload: any = {}) {
    DeleteSongInPlaylistUseCase.verifyPayload(payload);

    const { playlistId, userId, songId } = payload;

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.PLAYLIST_NOT_FOUND');
    }

    const isAnOwnerPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (!isAnOwnerPlaylist) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.USER_NOT_OWNED_PLAYLIST');
    }

    await this.playlistRepository.deleteSongInPlaylist(playlistId, songId);

    await this.activitiesRepository.persist({
      userId,
      playlistId,
      songId,
      action: 'delete',
      time: new Date().toISOString(),
    });
  }

  private static verifyPayload({ playlistId, userId, songId }: any) {
    if (!playlistId) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.NOT_CONTAIN_PLAYLIST_ID');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('DELETE_SONG_IN_PLAYLIST.PLAYLIST_ID_NOT_STRING');
    }

    if (!userId) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('DELETE_SONG_IN_PLAYLIST.USER_ID_NOT_STRING');
    }

    if (!songId) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.NOT_CONTAIN_SONG_ID');
    }

    if (typeof songId !== 'string') {
      throw new Error('DELETE_SONG_IN_PLAYLIST.SONG_ID_NOT_STRING');
    }
  }
}

export default DeleteSongInPlaylistUseCase;
