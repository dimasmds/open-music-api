/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

const AuthenticationsTableTestHelper = {
  async cleanTable() {
    await pool.query('DELETE FROM authentications WHERE 1 = 1');
  },

  async findTokens(token: string) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token],
    };

    const result = await pool.query(query);

    return result.rows;
  },

  async insertToken(token: string) {
    const query = {
      text: 'INSERT INTO authentications VALUES ($1)',
      values: [token],
    };

    await pool.query(query);
  },
};

export default AuthenticationsTableTestHelper;
