import PlaylistRepository from '../repository/PlaylistRepository';
import SongRepository from '../../songs/repository/SongRepository';
import CollaborationRepository from '../../collaborations/repositories/CollaborationRepository';
import AuthorizationError from '../../../Commons/exceptions/AuthorizationError';

class PlaylistSongCreation {
  private playlistRepository: PlaylistRepository;

  private songRepository: SongRepository;

  private collaborationRepository: CollaborationRepository;

  public playlistId: string;

  public songId: string;

  constructor(
    playlistRepository: PlaylistRepository,
    songRepository: SongRepository,
    collaborationRepository: CollaborationRepository,
  ) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async create(payload: any = {}) {
    PlaylistSongCreation.verifyPayload(payload);

    const { playlistId, songId, userId } = payload;

    const isPlaylistValid = await this.playlistRepository.isPlaylistIdValid(playlistId);

    if (!isPlaylistValid) {
      throw new Error('PLAYLIST_SONG_CREATION.PLAYLIST_NOT_FOUND');
    }

    const isSongValid = await this.songRepository.isSongValid(songId);

    if (!isSongValid) {
      throw new Error('PLAYLIST_SONG_CREATION.SONG_NOT_VALID');
    }

    const isCanAccess = await Promise.all([
      this.playlistRepository.isAnOwnerPlaylist(playlistId, userId),
      this.collaborationRepository.isCollaboratorPlaylist(playlistId, userId),
    ]);

    if (!isCanAccess.includes(true)) {
      throw new AuthorizationError('Your are not an owner or collaborator of this playlist');
    }

    this.playlistId = playlistId;
    this.songId = songId;

    return this;
  }

  private static verifyPayload({ playlistId, songId, userId }: any) {
    if (!playlistId) {
      throw new Error('PLAYLIST_SONG_CREATION.NOT_CONTAIN_PLAYLIST_ID');
    }

    if (typeof playlistId !== 'string') {
      throw new Error('PLAYLIST_SONG_CREATION.PLAYLIST_ID_NOT_STRING');
    }

    if (!songId) {
      throw new Error('PLAYLIST_SONG_CREATION.NOT_CONTAIN_SONG_ID');
    }

    if (typeof songId !== 'string') {
      throw new Error('PLAYLIST_SONG_CREATION.SONG_ID_NOT_STRING');
    }

    if (!userId) {
      throw new Error('PLAYLIST_SONG_CREATION.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('PLAYLIST_SONG_CREATION.USER_ID_NOT_STRING');
    }
  }
}

export default PlaylistSongCreation;
