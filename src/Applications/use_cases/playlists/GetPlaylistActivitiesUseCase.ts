// TODO: not test yet!
import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';
import CollaborationRepository
  from '../../../Domains/collaborations/repositories/CollaborationRepository';

class GetPlaylistActivitiesUseCase {
  private playlistRepository: PlaylistRepository;

  private activitiesRepository: ActivitiesRepository;

  private collaborationRepository: CollaborationRepository;

  constructor({
    playlistRepository,
    activitiesRepository, collaborationRepository,
  }: UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.activitiesRepository = activitiesRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute({ playlistId, userId } : { playlistId: string, userId: string }) {
    if (!playlistId) {
      throw new InvariantError('Playlist ID is required');
    }

    if (typeof playlistId !== 'string') {
      throw new InvariantError('Playlist ID must be a string');
    }

    const isValidPlaylist = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isValidPlaylist) {
      throw new NotFoundError('Playlist not found');
    }

    const isCanAccess = await Promise.all([
      this.collaborationRepository.isCollaboratorPlaylist(playlistId, userId),
      this.playlistRepository.isAnOwnerPlaylist(playlistId, userId),
    ]);

    if (!isCanAccess.some(Boolean)) {
      throw new AuthorizationError('You are not authorized to access this playlist');
    }

    return this.activitiesRepository.getActivitiesInPlaylist(playlistId);
  }
}

export default GetPlaylistActivitiesUseCase;
