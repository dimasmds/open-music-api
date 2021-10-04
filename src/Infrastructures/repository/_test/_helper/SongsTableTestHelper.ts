/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

const SongsTableTestHelper = {
  async addSong({
    id = 'song-123', title = 'Fix you', year = 2000, genre = 'pop', performer = 'Coldplay', duration = 90, albumId = null,
  } = {}) {
    const query = {
      text: 'INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7)',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    await pool.query(query);
  },
  async findSongsById(songId: string) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [songId],
    };

    const result = await pool.query(query);

    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM songs WHERE 1=1');
  },
};

export default SongsTableTestHelper;
