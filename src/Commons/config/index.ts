/* istanbul ignore file */

import path from 'path';
import dotenv from 'dotenv';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: path.resolve(__dirname, '../../../.test.env') });
} else {
  dotenv.config();
}

const config = {
  server: {
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
  },
  database: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    name: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
  },
  security: {
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
  },
};

export default config;
