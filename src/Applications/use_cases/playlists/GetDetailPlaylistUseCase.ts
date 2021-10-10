import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

class GetDetailPlaylistUseCase {
  private userRepository: UserRepository;

  private playlistRepository: PlaylistRepository;

  private songRepository: SongRepository;

  constructor({ userRepository, playlistRepository, songRepository } : UseCaseDependencies) {
    this.userRepository = userRepository;
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
  }

  async execute(useCasePayload: any = {}) {
    GetDetailPlaylistUseCase.verifyPayload(useCasePayload);

    const { playlistId, userId } = useCasePayload;

    const isPlaylistIdValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistIdValid) {
      throw new Error('GET_DETAIL_PLAYLIST.PLAYLIST_NOT_FOUND');
    }

    const isAnOwnerPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (!isAnOwnerPlaylist) {
      throw new Error('GET_DETAIL_PLAYLIST.USER_NOT_OWNED_PLAYLIST');
    }

    return this.playlistRepository.getPlaylist(playlistId);
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
