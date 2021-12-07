import { Pool } from 'pg';
import AlbumRepository, { LikeCountSource } from '../../Domains/albums/repository/AlbumRepository';
import RepositoryDependencies from './definitions/RepositoryDependencies';
import AlbumDetail from '../../Domains/albums/entities/AlbumDetail';
import AlbumCreation from '../../Domains/albums/entities/AlbumCreation';
import AlbumUpdate from '../../Domains/albums/entities/AlbumUpdate';
import createRedisClient from '../cache/redis/client';

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
      text: 'SELECT id, name, year, cover_url FROM albums WHERE id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);

    const rawAlbum = result.rows[0];

    return new AlbumDetail({ ...rawAlbum, coverUrl: rawAlbum.cover_url, songs: null });
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

  async isAlbumLikedByUser(albumId: string, userId: string): Promise<boolean> {
    const query = {
      text: 'SELECT id FROM album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId],
    };

    const result = await this.pool.query(query);

    return !!result.rowCount;
  }

  async likeAlbum(userId: string, albumId: string): Promise<void> {
    const redisClient = await createRedisClient();
    await redisClient.connect();

    const id = `albumLike-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO album_likes VALUES ($1, $2, $3)',
      values: [id, userId, albumId],
    };

    await this.pool.query(query);
    await redisClient.del(`albumLikeCount-${albumId}`);
  }

  async unlikeAlbum(userId: string, albumId: string): Promise<void> {
    const redisClient = await createRedisClient();
    await redisClient.connect();

    const query = {
      text: 'DELETE FROM album_likes WHERE album_id = $1 AND user_id = $2',
      values: [albumId, userId],
    };

    await this.pool.query(query);
    await redisClient.del(`albumLikeCount-${albumId}`);
  }

  async getLikeCount(albumId: string): Promise<LikeCountSource> {
    const redisClient = await createRedisClient();
    await redisClient.connect();

    const cachedLikeCount = await redisClient.get(`albumLikeCount-${albumId}`);

    if (cachedLikeCount) {
      await redisClient.disconnect();
      return {
        count: parseInt(cachedLikeCount, 10),
        source: 'cache',
      };
    }

    const query = {
      text: 'SELECT COUNT(*) FROM album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this.pool.query(query);
    const likeCount = Number(result.rows[0].count);
    await redisClient.set(`albumLikeCount-${albumId}`, `${likeCount}`);

    await redisClient.disconnect();
    return {
      count: likeCount,
      source: 'database',
    };
  }
}

export default AlbumRepositoryPostgres;
