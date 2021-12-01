import PlaylistRepository from '../repository/PlaylistRepository';
import SongRepository from '../../songs/repository/SongRepository';

class PlaylistSongCreation {
  private playlistRepository: PlaylistRepository;

  private songRepository: SongRepository;

  public playlistId: string;

  public songId: string;

  constructor(playlistRepository: PlaylistRepository, songRepository: SongRepository) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
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

    const isAnOwnerPlaylist = await this.playlistRepository.isAnOwnerPlaylist(playlistId, userId);

    if (!isAnOwnerPlaylist) {
      throw new Error('PLAYLIST_SONG_CREATION.NOT_AN_OWNER');
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
