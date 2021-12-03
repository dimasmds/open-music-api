// TODO: not test yet!
import { Pool } from 'pg';
import ActivitiesRepository from '../../Domains/activities/repository/ActivitiesRepository';
import RepositoryDependencies from './definitions/RepositoryDependencies';
import NewActivity from '../../Domains/activities/entities/NewActivity';
import Activity from '../../Domains/activities/entities/Activity';

class ActivitiesRepositoryPostgres implements ActivitiesRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator } : RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async persist(activity: NewActivity): Promise<void> {
    const id = this.idGenerator();
    const {
      playlistId, songId, userId, action, time,
    } = activity;

    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES ($1, $2, $3, $4, $5, $6)',
      values: [id, playlistId, songId, userId, action, time],
    };

    await this.pool.query(query);
  }

  async getActivitiesInPlaylist(playlistId: string): Promise<Activity[]> {
    const query = {
      text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
      FROM playlist_song_activities
      JOIN songs ON playlist_song_activities.song_id = songs.id
      JOIN users ON playlist_song_activities.user_id = users.id
      WHERE playlist_song_activities.playlist_id = $1`,
      values: [playlistId],
    };

    const result = await this.pool.query(query);

    return result.rows.map((row) => ({
      username: row.username, title: row.title, action: row.action, time: row.time,
    }));
  }
}

export default ActivitiesRepositoryPostgres;
