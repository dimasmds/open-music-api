import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import PlaylistSongCreation from '../../../Domains/playlists/entities/PlaylistSongCreation';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';
import CollaborationRepository
  from '../../../Domains/collaborations/repositories/CollaborationRepository';

class AddSongToPlaylistUseCase {
  private readonly playlistRepository: PlaylistRepository;

  private readonly songRepository: SongRepository;

  private readonly collaborationRepository: CollaborationRepository;

  private activitiesRepository: ActivitiesRepository;

  constructor({
    playlistRepository, songRepository, activitiesRepository, collaborationRepository,
  } : UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.songRepository = songRepository;
    this.activitiesRepository = activitiesRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute(payload: any = {}) {
    const playlistSongCreation = new PlaylistSongCreation(
      this.playlistRepository,
      this.songRepository,
      this.collaborationRepository,
    );

    await playlistSongCreation.create(payload);

    await this.playlistRepository.persistSongToPlaylist(playlistSongCreation);

    const { playlistId, songId, userId } = payload;

    await this.activitiesRepository.persist({
      playlistId,
      songId,
      userId,
      action: 'add',
      time: new Date().toISOString(),
    });
  }
}

export default AddSongToPlaylistUseCase;
