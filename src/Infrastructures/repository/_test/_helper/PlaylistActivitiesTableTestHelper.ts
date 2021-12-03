import pool from '../../../database/postgres/pool';

const PlaylistActivitiesTableTestHelper = {
  async cleanTable() {
    // noinspection SqlConstantExpression
    await pool.query('DELETE FROM playlist_song_activities WHERE 1=1');
  },
};

export default PlaylistActivitiesTableTestHelper;
