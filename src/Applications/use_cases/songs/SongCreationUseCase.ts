import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import SongCreation from '../../../Domains/songs/entities/SongCreation';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';

class SongCreationUseCase {
  private readonly songRepository: SongRepository;

  private readonly albumRepository: AlbumRepository;

  constructor({ songRepository, albumRepository }: UseCaseDependencies) {
    this.songRepository = songRepository;
    this.albumRepository = albumRepository;
  }

  async execute(payload: any) {
    const songCreation = new SongCreation(this.albumRepository);
    const createdSongCreation = await songCreation.create(payload);
    return this.songRepository.persist(createdSongCreation);
  }
}

export default SongCreationUseCase;
