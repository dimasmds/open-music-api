import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import CollaborationRepository
  from '../../../Domains/collaborations/repositories/CollaborationRepository';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';

class GetDetailPlaylistUseCase {
  private playlistRepository: PlaylistRepository;

  private songRepository: SongRepository;

  private collaborationRepository: CollaborationRepository;

  constructor({
    playlistRepository,
    songRepository,
    collaborationRepository,
  } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute(useCasePayload: any = {}) {
    GetDetailPlaylistUseCase.verifyPayload(useCasePayload);

    const { playlistId, userId } = useCasePayload;

    const isPlaylistIdValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistIdValid) {
      throw new Error('GET_DETAIL_PLAYLIST.PLAYLIST_NOT_FOUND');
    }

    const isCanAccess = await Promise.all([
      this.playlistRepository.isAnOwnerPlaylist(playlistId, userId),
      this.collaborationRepository.isCollaboratorPlaylist(playlistId, userId),
    ]);

    if (!isCanAccess.includes(true)) {
      throw new AuthorizationError('you are not authorized to access this playlist');
    }

    const playlist = await this.playlistRepository.getPlaylist(playlistId);
    playlist.songs = await this.songRepository.getSongsInPlaylist(playlistId);

    return playlist;
  }

  private static verifyPayload({ playlistId, userId }: any) {
    if (!playlistId) {
      throw new Error('GET_DETAIL_PLAYLIST.NOT_CONTAIN_PLAYLIST_ID');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('GET_DETAIL_PLAYLIST.PLAYLIST_ID_NOT_STRING');
    }

    if (!userId) {
      throw new Error('GET_DETAIL_PLAYLIST.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('GET_DETAIL_PLAYLIST.USER_ID_NOT_STRING');
    }
  }
}

export default GetDetailPlaylistUseCase;
