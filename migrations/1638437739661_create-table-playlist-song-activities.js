/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(10)',
      notNull: true,
    },
    time: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });

  pgm.createConstraint('playlist_song_activities', 'fk.playlist_id', 'FOREIGN KEY (playlist_id) REFERENCES playlists(id) ON DELETE CASCADE');
  pgm.createConstraint('playlist_song_activities', 'fk.song_id', 'FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE');
  pgm.createConstraint('playlist_song_activities', 'fk.user_id', 'FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_song_activities');
};
