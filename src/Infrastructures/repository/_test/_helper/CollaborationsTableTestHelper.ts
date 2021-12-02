/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

const CollaborationsTableTestHelper = {
  async findCollaboration({ playlistId = 'playlist-123', userId = 'user-123' }) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id = $1 AND user_id = $2',
      values: [playlistId, userId],
    };
    const { rows } = await pool.query(query);
    return rows;
  },

  async addCollaboration({ id = 'collaboration-123', playlistId = 'playlist-123', userId = 'user-123' }) {
    const query = {
      text: 'INSERT INTO collaborations VALUES ($1, $2, $3)',
      values: [id, playlistId, userId],
    };

    await pool.query(query);
  },

  async cleanTable() {
    await pool.query('DELETE FROM collaborations WHERE 1=1');
  },
};

export default CollaborationsTableTestHelper;
