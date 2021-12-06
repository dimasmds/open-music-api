import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';
import PlaylistExportService from '../../../Domains/playlists/service/PlaylistExportService';

class ExportPlaylistUseCase {
  private playlistRepository: PlaylistRepository;

  private playlistExportService: PlaylistExportService;

  constructor({ playlistRepository, playlistExportService }: UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.playlistExportService = playlistExportService;
  }

  async execute(payload: any = {}) {
    ExportPlaylistUseCase.verifyPayload(payload);
    const { userId, playlistId, targetEmail } = payload;

    const isPlaylistIdValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistIdValid) {
      throw new NotFoundError(`Playlist with id ${playlistId} does not exist`);
    }

    const isUserOwnedPlaylist = await this.playlistRepository.isAnOwnerPlaylist(userId, playlistId);

    if (!isUserOwnedPlaylist) {
      throw new InvariantError(`User with id ${userId} is not the owner of playlist with id ${playlistId}`);
    }

    await this.playlistExportService.export(playlistId, targetEmail);
  }

  private static verifyPayload({ userId, playlistId, targetEmail }: any) {
    if (!userId) {
      throw new InvariantError('userId is required');
    }

    if (typeof userId !== 'string') {
      throw new InvariantError('userId must be a string');
    }

    if (!playlistId) {
      throw new InvariantError('playlistId is required');
    }

    if (typeof playlistId !== 'string') {
      throw new InvariantError('playlistId must be a string');
    }

    if (!targetEmail) {
      throw new InvariantError('targetEmail is required');
    }

    if (typeof targetEmail !== 'string') {
      throw new InvariantError('targetEmail must be a string');
    }

    if (!targetEmail.includes('@') && !targetEmail.includes('.')) {
      throw new InvariantError('targetEmail must be a valid email');
    }
  }
}

export default ExportPlaylistUseCase;
