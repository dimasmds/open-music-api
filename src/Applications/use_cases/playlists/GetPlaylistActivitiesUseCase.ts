// TODO: not test yet!
import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';

class GetPlaylistActivitiesUseCase {
  private playlistRepository: PlaylistRepository;

  private activitiesRepository: ActivitiesRepository;

  constructor({ playlistRepository, activitiesRepository }: UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.activitiesRepository = activitiesRepository;
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

    const isUserOwnedPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (!isUserOwnedPlaylist) {
      throw new AuthorizationError('User is not an owner of this playlist');
    }

    return this.activitiesRepository.getActivitiesInPlaylist(playlistId);
  }
}

export default GetPlaylistActivitiesUseCase;
