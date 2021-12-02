import { Pool } from 'pg';
import UserRepository from '../../Domains/users/repository/UserRepository';
import UserRegister from '../../Domains/users/entities/UserRegister';
import RepositoryDependencies from './definitions/RepositoryDependencies';

class UserRepositoryPostgres implements UserRepository {
  private pool: Pool;

  private readonly idGenerator: Function;

  constructor({ pool, idGenerator }: RepositoryDependencies) {
    this.pool = pool;
    this.idGenerator = idGenerator;
  }

  async isUserIdValid(userId: string): Promise<boolean> {
    const query = {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [userId],
    };

    const result = await this.pool.query(query);

    return result.rowCount > 0;
  }

  async getPasswordByUsername(username: string): Promise<string | null> {
    const query = {
      text: 'SELECT password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].password;
  }

  async getUserIdByUsername(username: string): Promise<string | null> {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    if (!result.rowCount) {
      return null;
    }

    return result.rows[0].id;
  }

  async isRegisterUsernameAvailable(username: string): Promise<boolean> {
    const query = {
      text: 'SELECT id FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this.pool.query(query);

    return !result.rowCount;
  }

  async persist(registerUser: UserRegister): Promise<string> {
    const { username, password, fullname } = registerUser;
    const id = `user-${this.idGenerator()}`;

    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4) RETURNING id',
      values: [id, username, password, fullname],
    };

    const result = await this.pool.query(query);

    return result.rows[0].id;
  }
}

export default UserRepositoryPostgres;
