import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import AlbumCreation from '../../../Domains/albums/entities/AlbumCreation';

class AlbumCreationUseCase {
  private albumRepository: AlbumRepository;

  constructor({ albumRepository }: UseCaseDependencies) {
    this.albumRepository = albumRepository;
  }

  async execute(payload: any) {
    const albumCreation = new AlbumCreation();
    const createdAlbumCreation = await albumCreation.create(payload);
    return this.albumRepository.persist(createdAlbumCreation);
  }
}

export default AlbumCreationUseCase;
