/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

const PlaylistsTableTestHelper = {
  async addPlaylist({ id = 'playlist-123', name = 'Test Playlist', owner = 'user-123' } : any) {
    const query = {
      text: 'INSERT INTO playlists VALUES ($1, $2, $3)',
      values: [id, name, owner],
    };

    await pool.query(query);
  },
  async findPlaylistById(id: string) {
    const query = {
      text: 'SELECT * FROM playlists WHERE id = $1',
      values: [id],
    };

    const result = await pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM playlists WHERE 1 = 1');
  },
};

export default PlaylistsTableTestHelper;
