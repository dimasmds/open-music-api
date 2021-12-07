/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'users',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: 'albums',
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('album_likes');
};
