import pool from '../../../database/postgres/pool';

const AlbumsTableTestHelper = {
  async addAlbum({ id = 'album-123', name = 'Viva la vida', year = 2000 } = {}) {
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3)',
      values: [id, name, year],
    };

    await pool.query(query);
  },

  async findAlbumsById(id = 'album-123') {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },

  async cleanTable() {
    await pool.query('DELETE FROM albums WHERE 1 = 1');
  },
};

export default AlbumsTableTestHelper;
