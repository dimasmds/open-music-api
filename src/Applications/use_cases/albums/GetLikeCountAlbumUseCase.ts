import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

class GetLikeCountAlbumUseCase {
  private albumRepository: AlbumRepository;

  constructor({ albumRepository } : UseCaseDependencies) {
    this.albumRepository = albumRepository;
  }

  async execute(payload: any = {}): Promise<number> {
    const { albumId } = payload;

    if (!albumId) {
      throw new InvariantError('Album ID is required');
    }

    if (typeof albumId !== 'string') {
      throw new InvariantError('Album ID must be a string');
    }

    const isAlbumValid = await this.albumRepository.isAlbumValid(albumId);

    if (!isAlbumValid) {
      throw new NotFoundError('Album does not exist');
    }

    return this.albumRepository.getLikeCount(albumId);
  }
}

export default GetLikeCountAlbumUseCase;
