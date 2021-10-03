import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import SongUpdate from '../../../Domains/songs/entities/SongUpdate';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';

class UpdateSongUseCase {
  private readonly songRepository: SongRepository;

  private readonly albumRepository: AlbumRepository;

  constructor({ songRepository, albumRepository }: UseCaseDependencies) {
    this.songRepository = songRepository;
    this.albumRepository = albumRepository;
  }

  async execute(payload: any) {
    const songUpdate = new SongUpdate(this.songRepository, this.albumRepository);
    const createdSongUpdate = await songUpdate.create(payload);
    await this.songRepository.update(createdSongUpdate);
  }
}

export default UpdateSongUseCase;
