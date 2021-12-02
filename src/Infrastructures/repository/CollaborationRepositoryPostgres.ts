import { Pool } from 'pg';
import CollaborationRepository
  from '../../Domains/collaborations/repositories/CollaborationRepository';
import CollaborationDeletion from '../../Domains/collaborations/entities/CollaborationDeletion';
import CollaborationCreation from '../../Domains/collaborations/entities/CollaborationCreation';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class CollaborationRepositoryPostgres implements CollaborationRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator } : RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async delete(collaborationDeletion: CollaborationDeletion): Promise<void> {
    const { playlistId, userId } = collaborationDeletion;

    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };

    await this.pool.query(query);
  }

  async persist(collaborationCreation: CollaborationCreation): Promise<string> {
    const { playlistId, userId } = collaborationCreation;
    const id = `collaboration-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO collaborations VALUES ($1, $2, $3) RETURNING id',
      values: [id, playlistId, userId],
    };

    const { rows } = await this.pool.query(query);

    return rows[0].id;
  }
}

export default CollaborationRepositoryPostgres;
