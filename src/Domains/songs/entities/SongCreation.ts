import AlbumRepository from '../../albums/repository/AlbumRepository';

class SongCreation {
  public title: string;

  public year: number;

  public genre: string;

  public performer: string;

  public duration: number | null;

  public albumId: string | null;

  private albumRepository: AlbumRepository;

  constructor(albumRepository: AlbumRepository) {
    this.albumRepository = albumRepository;
  }

  async create(payload: any) : Promise<SongCreation> {
    SongCreation.verifyPayload(payload);

    const {
      title, year, genre, performer, duration = null, albumId = null,
    } = payload;

    if (albumId !== null) {
      const isAlbumValid = await this.albumRepository.isAlbumValid(albumId);

      if (!isAlbumValid) {
        throw new Error('SONG_CREATION.ALBUM_NOT_VALID');
      }
    }

    this.title = title;
    this.year = year;
    this.genre = genre;
    this.performer = performer;
    this.duration = duration;
    this.albumId = albumId;

    return this;
  }

  private static verifyPayload(payload: any) {
    const {
      title, year, genre, performer, duration, albumId,
    } = payload;

    if (!title) {
      throw new Error('SONG_CREATION.PAYLOAD_NOT_CONTAIN_TITLE');
    }

    if (typeof title !== 'string') {
      throw new Error('SONG_CREATION.TITLE_NOT_STRING');
    }

    if (year === undefined) {
      throw new Error('SONG_CREATION.PAYLOAD_NOT_CONTAIN_YEAR');
    }

    if (typeof year !== 'number') {
      throw new Error('SONG_CREATION.YEAR_NOT_NUMBER');
    }

    if (year % 1 !== 0) {
      throw new Error('SONG_CREATION.YEAR_SHOULD_NOT_DECIMAL');
    }

    if (!genre) {
      throw new Error('SONG_CREATION.PAYLOAD_NOT_CONTAIN_GENRE');
    }

    if (typeof genre !== 'string') {
      throw new Error('SONG_CREATION.GENRE_NOT_STRING');
    }

    if (!performer) {
      throw new Error('SONG_CREATION.PAYLOAD_NOT_CONTAIN_PERFORMER');
    }

    if (typeof performer !== 'string') {
      throw new Error('SONG_CREATION.PERFORMER_NOT_STRING');
    }

    if (duration) {
      if (typeof duration !== 'number') {
        throw new Error('SONG_CREATION.DURATION_NOT_STRING');
      }
    }

    if (albumId) {
      if (typeof albumId !== 'string') {
        throw new Error('SONG_CREATION.ALBUM_ID_NOT_STRING');
      }
    }
  }
}

export default SongCreation;
