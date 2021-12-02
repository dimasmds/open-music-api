// TODO: not test yet!
import { Pool } from 'pg';
import ActivitiesRepository from '../../Domains/activities/repository/ActivitiesRepository';
import RepositoryDependencies from './definitions/RepositoryDependencies';
import NewActivity from '../../Domains/activities/entities/NewActivity';

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
}

export default ActivitiesRepositoryPostgres;
