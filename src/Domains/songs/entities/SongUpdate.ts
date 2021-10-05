import SongRepository from '../repository/SongRepository';
import AlbumRepository from '../../albums/repository/AlbumRepository';

class SongUpdate {
  private songRepository: SongRepository;

  public id: string;

  public title: string;

  public performer: string;

  public genre: string;

  public year: number;

  public duration: number | null;

  public albumId: string | null;

  private albumRepository: AlbumRepository;

  constructor(songRepository: SongRepository, albumRepository: AlbumRepository) {
    this.songRepository = songRepository;
    this.albumRepository = albumRepository;
  }

  async create(payload: any): Promise<SongUpdate> {
    SongUpdate.verifyPayload(payload);

    const {
      id, title, performer, genre, year, duration = null, albumId = null,
    } = payload;

    const isSongValid = await this.songRepository.isSongValid(id);

    if (!isSongValid) {
      throw new Error('SONG_UPDATE.ID_NOT_VALID');
    }

    if (albumId !== null) {
      const isAlbumValid = await this.albumRepository.isAlbumValid(albumId);

      if (!isAlbumValid) {
        throw new Error('SONG_UPDATE.ALBUM_NOT_VALID');
      }
    }

    this.id = id;
    this.title = title;
    this.performer = performer;
    this.genre = genre;
    this.year = year;
    this.duration = duration;
    this.albumId = albumId;

    return this;
  }

  private static verifyPayload(payload: any) {
    const {
      id, title, performer, genre, year, duration, albumId,
    } = payload;

    if (!title) {
      throw new Error('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_TITLE');
    }

    if (typeof title !== 'string') {
      throw new Error('SONG_UPDATE.TITLE_NOT_STRING');
    }

    if (year === undefined) {
      throw new Error('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_YEAR');
    }

    if (typeof year !== 'number') {
      throw new Error('SONG_UPDATE.YEAR_NOT_NUMBER');
    }

    if (year % 1 !== 0) {
      throw new Error('SONG_UPDATE.YEAR_SHOULD_NOT_DECIMAL');
    }

    if (!genre) {
      throw new Error('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_GENRE');
    }

    if (typeof genre !== 'string') {
      throw new Error('SONG_UPDATE.GENRE_NOT_STRING');
    }

    if (!performer) {
      throw new Error('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_PERFORMER');
    }

    if (typeof performer !== 'string') {
      throw new Error('SONG_UPDATE.PERFORMER_NOT_STRING');
    }

    if (!id) {
      throw new Error('SONG_UPDATE.PAYLOAD_NOT_CONTAIN_ID');
    }

    if (typeof id !== 'string') {
      throw new Error('SONG_UPDATE.ID_NOT_STRING');
    }

    if (duration) {
      if (typeof duration !== 'number') {
        throw new Error('SONG_UPDATE.DURATION_NOT_NUMBER');
      }
    }

    if (albumId) {
      if (typeof albumId !== 'string') {
        throw new Error('SONG_UPDATE.ALBUM_ID_NOT_STRING');
      }
    }
  }
}

export default SongUpdate;
