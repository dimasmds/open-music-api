import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';
import CollaborationRepository
  from '../../../Domains/collaborations/repositories/CollaborationRepository';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';

class DeleteSongInPlaylistUseCase {
  private playlistRepository: PlaylistRepository;

  private activitiesRepository: ActivitiesRepository;

  private collaborationRepository: CollaborationRepository;

  constructor({
    playlistRepository,
    activitiesRepository, collaborationRepository,
  } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.activitiesRepository = activitiesRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute(payload: any = {}) {
    DeleteSongInPlaylistUseCase.verifyPayload(payload);

    const { playlistId, userId, songId } = payload;

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('DELETE_SONG_IN_PLAYLIST.PLAYLIST_NOT_FOUND');
    }

    const isCanAccess = await Promise.all([
      this.playlistRepository.isAnOwnerPlaylist(playlistId, userId),
      this.collaborationRepository.isCollaboratorPlaylist(playlistId, userId),
    ]);

    if (!isCanAccess.includes(true)) {
      throw new AuthorizationError('you are not authorized to access this playlist');
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
