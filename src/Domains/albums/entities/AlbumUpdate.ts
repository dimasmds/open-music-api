import AlbumRepository from '../repository/AlbumRepository';

class AlbumUpdate {
  private albumRepository: AlbumRepository;

  public id: string;

  public name: string;

  public year: string;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  async create(payload: any): Promise<AlbumUpdate> {
    AlbumUpdate.verifyPayload(payload);

    const { id, name, year } = payload;

    const isAlbumValid = await this.albumRepository.isAlbumValid(id);

    if (!isAlbumValid) {
      throw new Error('ALBUM_UPDATE.ID_NOT_VALID');
    }

    this.id = id;
    this.name = name;
    this.year = year;

    return this;
  }

  private static verifyPayload(payload: any) {
    const { id, name, year } = payload;
    if (!id) {
      throw new Error('ALBUM_UPDATE.NOT_CONTAIN_ID');
    }

    if (typeof id !== 'string') {
      throw new Error('ALBUM_UPDATE.ID_NOT_STRING');
    }

    if (!name) {
      throw new Error('ALBUM_UPDATE.NOT_CONTAIN_NAME');
    }

    if (typeof name !== 'string') {
      throw new Error('ALBUM_UPDATE.NAME_NOT_STRING');
    }

    if (!year) {
      throw new Error('ALBUM_UPDATE.NOT_CONTAIN_YEAR');
    }

    if (typeof year !== 'number') {
      throw new Error('ALBUM_UPDATE.YEAR_NOT_NUMBER');
    }

    if (year % 1 !== 0) {
      throw new Error('ALBUM_UPDATE.SHOULD_NOT_DECIMAL');
    }
  }
}

export default AlbumUpdate;
