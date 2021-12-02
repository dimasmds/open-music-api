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

  async cleanTable() {
    await pool.query('DELETE FROM collaborations WHERE 1=1');
  },
};

export default CollaborationsTableTestHelper;
