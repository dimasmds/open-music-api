import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';

class DeleteAlbumUseCase {
  private albumRepository: AlbumRepository;

  constructor({ albumRepository }: UseCaseDependencies) {
    this.albumRepository = albumRepository;
  }

  async execute(payload: any = {}) {
    DeleteAlbumUseCase.verifyPayload(payload);

    const { id } = payload;

    const isAlbumValid = await this.albumRepository.isAlbumValid(id);

    if (!isAlbumValid) {
      throw new Error('DELETE_ALBUM.ID_NOT_VALID');
    }

    await this.albumRepository.deleteAlbum(id);
  }

  private static verifyPayload({ id }: any) {
    if (!id) {
      throw new Error('DELETE_ALBUM.ID_NOT_DEFINED');
    }

    if (typeof id !== 'string') {
      throw new Error('DELETE_ALBUM.ID_NOT_STRING');
    }
  }
}

export default DeleteAlbumUseCase;
