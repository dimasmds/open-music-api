/* istanbul ignore file */
import pool from '../../../database/postgres/pool';

const PlaylistSongsTableTestHelper = {
  async addPlaylistSongs({ id = 'psongs-123', playlistId = 'playlist-123', songId = 'song-123' }: any) {
    const query = {
      text: 'INSERT INTO playlist_songs VALUES ($1, $2, $3)',
      values: [id, playlistId, songId],
    };

    await pool.query(query);
  },
  async findSongInPlaylist(songId: string, playlistId: string) {
    const query = {
      text: 'SELECT * FROM playlist_songs WHERE song_id = $1 AND playlist_id = $2',
      values: [songId, playlistId],
    };

    const result = await pool.query(query);
    return result.rows;
  },
  async cleanTable() {
    await pool.query('DELETE FROM playlist_songs WHERE 1=1');
  },
};

export default PlaylistSongsTableTestHelper;
