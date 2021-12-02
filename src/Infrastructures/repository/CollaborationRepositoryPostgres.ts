import { Pool } from 'pg';
import CollaborationRepository
  from '../../Domains/collaborations/repositories/CollaborationRepository';
import CollaborationDeletion from '../../Domains/collaborations/entities/CollaborationDeletion';
import CollaborationCreation from '../../Domains/collaborations/entities/CollaborationCreation';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class CollaborationRepositoryPostgres implements CollaborationRepository {
  private pool: Pool;

  private idGenerator: Function;

  constructor({ pool, idGenerator } : RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  delete(collaborationDeletion: CollaborationDeletion): Promise<void> {
    return Promise.resolve(undefined);
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
