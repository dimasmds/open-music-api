import { Pool } from 'pg';
import AlbumRepository from '../../Domains/albums/repository/AlbumRepository';
import RepositoryDependencies from './definitions/RepositoryDependencies';
import AlbumDetail from '../../Domains/albums/entities/AlbumDetail';
import AlbumCreation from '../../Domains/albums/entities/AlbumCreation';
import AlbumUpdate from '../../Domains/albums/entities/AlbumUpdate';

class AlbumRepositoryPostgres implements AlbumRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator }: RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async deleteAlbum(albumId: string): Promise<void> {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1',
      values: [albumId],
    };

    await this.pool.query(query);
  }

  async getAlbumById(albumId: string): Promise<AlbumDetail> {
    const query = {
      text: 'SELECT id, name, year FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);

    const rawAlbum = result.rows[0];

    return new AlbumDetail({ ...rawAlbum, songs: null });
  }

  async isAlbumValid(albumId: string): Promise<boolean> {
    const query = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);

    return !!result.rowCount;
  }

  async persist(albumCreation: AlbumCreation): Promise<string> {
    const { name, year } = albumCreation;
    const id = `album-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async updateAlbum(albumUpdate: AlbumUpdate): Promise<void> {
    const { id, name, year } = albumUpdate;

    const query = {
      text: 'UPDATE albums SET name = $2, year = $3 WHERE id = $1',
      values: [id, name, year],
    };

    await this.pool.query(query);
  }

  async updateCoverUrl(albumId: string, coverUrl: string): Promise<void> {
    const query = {
      text: 'UPDATE albums SET cover_url = $2 WHERE id = $1',
      values: [albumId, coverUrl],
    };

    await this.pool.query(query);
  }
}

export default AlbumRepositoryPostgres;
