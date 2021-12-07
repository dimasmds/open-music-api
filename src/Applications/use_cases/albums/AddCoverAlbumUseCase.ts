import { Readable } from 'stream';
import UseCaseDependencies from '../definitions/UseCaseDependencies';
import InvariantError from '../../../Commons/exceptions/InvariantError';
import StorageService from '../../storage/StorageService';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';

class AddCoverAlbumUseCase {
  private static allowedMimeTypes: string[] = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
  ];

  private storageService: StorageService;

  private albumRepository: AlbumRepository;

  constructor({ storageService, albumRepository }: UseCaseDependencies) {
    this.storageService = storageService;
    this.albumRepository = albumRepository;
  }

  async execute(payload: any = {}) {
    const { cover, albumId, contentType } = payload;

    const isAlbumIdValid = await this.albumRepository.isAlbumValid(albumId);

    if (!isAlbumIdValid) {
      throw new InvariantError('Album not found');
    }

    const filename = `album-${+new Date()}`;

    const fileUrl = await this.storageService.writeFile({
      file: cover,
      meta: {
        filename,
        contentType,
      },
    });

    await this.albumRepository.updateCoverUrl(albumId, fileUrl);

    return fileUrl;
  }

  async verifyPayload({ cover, albumId, contentType }: any) {
    if (!cover) {
      throw new InvariantError('Cover is required');
    }

    if (!(cover instanceof Readable)) {
      throw new InvariantError('Cover must be a readable stream');
    }

    if (!albumId) {
      throw new InvariantError('Album ID is required');
    }

    if (typeof albumId !== 'string') {
      throw new InvariantError('Album ID must be a string');
    }

    if (!contentType) {
      throw new InvariantError('Content type is required');
    }

    if (typeof contentType !== 'string') {
      throw new InvariantError('Content type must be a string');
    }

    if (!AddCoverAlbumUseCase.allowedMimeTypes.includes(contentType)) {
      throw new InvariantError('Content type is not allowed');
    }
  }
}

export default AddCoverAlbumUseCase;
