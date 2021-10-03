import UseCaseDependencies from '../definitions/UseCaseDependencies';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

class GetAlbumDetailUseCase {
  private albumRepository: AlbumRepository;

  private songRepository: SongRepository;

  constructor({ albumRepository, songRepository }: UseCaseDependencies) {
    this.albumRepository = albumRepository;
    this.songRepository = songRepository;
  }

  async execute(payload: any) {
    GetAlbumDetailUseCase.verifyPayload(payload);

    const { id } = payload;

    const isAlbumValid = await this.albumRepository.isAlbumValid(id);

    if (!isAlbumValid) {
      throw new Error('GET_ALBUM.ALBUM_NOT_FOUND');
    }

    const album = await this.albumRepository.getAlbumById(id);
    album.songs = await this.songRepository.getSongsInAlbum(id);

    return album;
  }

  private static verifyPayload({ id }: any) {
    if (!id) {
      throw new Error('GET_ALBUM.NOT_CONTAIN_ID');
    }

    if (typeof id !== 'string') {
      throw new Error('GET_ALBUM.ID_NOT_STRING');
    }
  }
}

export default GetAlbumDetailUseCase;
