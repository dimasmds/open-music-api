import { Pool } from 'pg';
import config from '../../../Commons/config';

const pool = new Pool({
  user: config.database.user,
  host: config.database.host,
  database: config.database.name,
  password: config.database.password,
  port: Number(config.database.port),
});

export default pool;
