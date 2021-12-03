import { Pool } from 'pg';
import PlaylistRepository from '../../Domains/playlists/repository/PlaylistRepository';
import PlaylistDetail from '../../Domains/playlists/entities/PlaylistDetail';
import Playlist from '../../Domains/playlists/entities/Playlist';
import PlaylistCreation from '../../Domains/playlists/entities/PlaylistCreation';
import PlaylistSongCreation from '../../Domains/playlists/entities/PlaylistSongCreation';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class PlaylistRepositoryPostgres implements PlaylistRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator } : RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    await this.pool.query(query);
  }

  async deleteSongInPlaylist(playlistId: string, songId: string): Promise<void> {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      values: [playlistId, songId],
    };

    await this.pool.query(query);
  }

  async getPlaylist(playlistId: string): Promise<PlaylistDetail> {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      LEFT JOIN users ON playlists.owner = users.id
      WHERE playlists.id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);
    const { id, name, username } = result.rows[0];

    return new PlaylistDetail(
      id,
      name,
      username,
      null,
    );
  }

  async getPlaylists(userId: string): Promise<Playlist[]> {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username 
      FROM playlists
      LEFT JOIN users ON playlists.owner = users.id
      LEFT JOIN collaborations ON playlists.id = collaborations.playlist_id
      WHERE collaborations.user_id = $1 OR playlists.owner = $1
      GROUP BY playlists.id, users.username`,
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rows.map(({ id, name, username }) => new Playlist(id, name, username));
  }

  async isAnOwnerPlaylist(playlistId: string, userId: string): Promise<boolean> {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1 AND owner = $2',
      values: [playlistId, userId],
    };

    const result = await this.pool.query(query);

    return result.rows.length > 0;
  }

  async isPlaylistIdValid(playlistId: string): Promise<boolean> {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [playlistId],
    };

    const result = await this.pool.query(query);

    return result.rows.length > 0;
  }

  async persist({ userId, name }: PlaylistCreation): Promise<string> {
    const id = `playlist-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, userId],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }

  async persistSongToPlaylist(playlistSongCreation: PlaylistSongCreation): Promise<void> {
    const id = `psong-${this.idGenerator()}`;
    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3)',
      values: [id, playlistSongCreation.playlistId, playlistSongCreation.songId],
    };

    await this.pool.query(query);
  }
}

export default PlaylistRepositoryPostgres;
