import { Pool } from 'pg';
import SongRepository from '../../Domains/songs/repository/SongRepository';
import SongDetail from '../../Domains/songs/entities/SongDetail';
import Song from '../../Domains/songs/entities/Song';
import SongCreation from '../../Domains/songs/entities/SongCreation';
import SongUpdate from '../../Domains/songs/entities/SongUpdate';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class SongRepositoryPostgres implements SongRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator } : RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async deleteSongById(songId: string): Promise<void> {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1',
      values: [songId],
    };

    await this.pool.query(query);
  }

  async getSongById(id: string): Promise<SongDetail | null> {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      return null;
    }

    const songRaw = result.rows[0];

    return new SongDetail({
      ...songRaw,
      albumId: songRaw.album_id,
    });
  }

  async getSongs(): Promise<Song[]> {
    const query = {
      text: 'SELECT id, title, performer FROM songs',
    };

    const result = await this.pool.query(query);

    const albumsRaw = result.rows;

    return albumsRaw.map((albumRaw: any) => new Song({ ...albumRaw }));
  }

  async getSongsInAlbum(albumId: string): Promise<Song[] | null> {
    const query = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);

    const songsRaw = result.rows;

    return songsRaw.map((songRaw: any) => new Song({ ...songRaw }));
  }

  async isSongValid(songId: string): Promise<boolean> {
    const query = {
      text: 'SELECT id FROM songs WHERE id = $1',
      values: [songId],
    };

    const result = await this.pool.query(query);

    return !!result.rowCount;
  }

  async persist(songCreation: SongCreation): Promise<string> {
    const {
      title, year, genre, performer, duration, albumId,
    } = songCreation;

    const id = `song-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async update(songUpdate: SongUpdate): Promise<void> {
    const {
      id, title, performer, genre, year, duration, albumId,
    } = songUpdate;

    const query = {
      text: `UPDATE songs 
             SET title = $2, performer = $3, genre = $4, year = $5, duration = $6, album_id = $7
             WHERE id = $1`,
      values: [id, title, performer, genre, year, duration, albumId],
    };

    await this.pool.query(query);
  }
}

export default SongRepositoryPostgres;
