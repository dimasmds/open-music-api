import { Pool } from 'pg';

interface RepositoryDependencies {
  pool?: Pool
  idGenerator?: Function
}

export default RepositoryDependencies;
