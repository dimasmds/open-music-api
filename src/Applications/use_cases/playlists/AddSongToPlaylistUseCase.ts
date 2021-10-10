import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import PlaylistSongCreation from '../../../Domains/playlists/entities/PlaylistSongCreation';

class AddSongToPlaylistUseCase {
  private readonly playlistRepository: PlaylistRepository;

  private readonly songRepository: SongRepository;

  constructor({ playlistRepository, songRepository } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
  }

  async execute(payload: any = {}) {
    const playlistSongCreation = new PlaylistSongCreation(
      this.playlistRepository, this.songRepository,
    );
    await playlistSongCreation.create(payload);

    await this.playlistRepository.persistSongToPlaylist(playlistSongCreation);
  }
}

export default AddSongToPlaylistUseCase;
