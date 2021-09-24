/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

type User = {
  id?: string
  username?: string
  password?: string
  fullname?: string
}

const UsersTableTestHelper = {
  async addUser({
    id = 'user-123', username = 'dicoding', password = 'secret', fullname = 'Dicoding Indonesia',
  }: User) {
    const query = {
      text: 'INSERT INTO users VALUES ($1, $2, $3, $4)',
      values: [id, username, password, fullname],
    };

    await pool.query(query);
  },
  async findUsersByUsername(username: string) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM users WHERE 1=1');
  },
};

export default UsersTableTestHelper;
