/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('authentications', {
    token: {
      type: 'TEXT',
      unique: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('authentications');
};
