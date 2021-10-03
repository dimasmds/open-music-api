import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import AlbumUpdate from '../../../Domains/albums/entities/AlbumUpdate';

class UpdateAlbumUseCase {
  private readonly albumRepository: AlbumRepository;

  constructor({ albumRepository }: UseCaseDependencies) {
    this.albumRepository = albumRepository;
  }

  async execute(payload: any) {
    const albumUpdate = new AlbumUpdate(this.albumRepository);
    const createdAlbumUpdate = await albumUpdate.create(payload);
    await this.albumRepository.updateAlbum(createdAlbumUpdate);
  }
}

export default UpdateAlbumUseCase;
