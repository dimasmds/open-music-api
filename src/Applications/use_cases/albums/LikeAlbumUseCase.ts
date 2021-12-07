import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import NotFoundError from '../../../Commons/exceptions/NotFoundError';

class LikeAlbumUseCase {
  private albumRepository: AlbumRepository;

  constructor({ albumRepository } : UseCaseDependencies) {
    this.albumRepository = albumRepository;
  }

  async execute(payload: any = {}) {
    LikeAlbumUseCase.verifyPayload(payload);
    const { userId, albumId } = payload;

    const isAlbumValid = await this.albumRepository.isAlbumValid(albumId);

    if (!isAlbumValid) {
      throw new NotFoundError('Album not found');
    }

    const isUserLikedAlbum = await this.albumRepository.isAlbumLikedByUser(albumId, userId);

    if (isUserLikedAlbum) {
      await this.albumRepository.unlikeAlbum(userId, albumId);
      return 'unliked';
    }

    await this.albumRepository.likeAlbum(userId, albumId);
    return 'liked';
  }

  private static verifyPayload({ userId, albumId }: any) {
    if (!userId) {
      throw new InvariantError('userId is required');
    }

    if (typeof userId !== 'string') {
      throw new InvariantError('userId must be a string');
    }

    if (!albumId) {
      throw new InvariantError('albumId is required');
    }

    if (typeof albumId !== 'string') {
      throw new InvariantError('albumId must be a string');
    }
  }
}

export default LikeAlbumUseCase;
