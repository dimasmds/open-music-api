import { Pool } from 'pg';
import AuthenticationRepository from '../../Domains/authentications/repository/AuthenticationRepository';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class AuthenticationRepositoryPostgres implements AuthenticationRepository {
  private pool: Pool;

  constructor({ pool }: RepositoryDependencies) {
    this.pool = pool;
  }

  async deleteRefreshToken(refreshToken: string): Promise<void> {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1',
      values: [refreshToken],
    };

    await this.pool.query(query);
  }

  async isRefreshTokenRegistered(refreshToken: string): Promise<boolean> {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [refreshToken],
    };

    const result = await this.pool.query(query);

    return Boolean(result.rowCount);
  }

  async persistRefreshToken(refreshToken: string): Promise<void> {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [refreshToken],
    };

    await this.pool.query(query);
  }
}

export default AuthenticationRepositoryPostgres;
