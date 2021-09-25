import { createContainer, ParameterOption } from 'instances-container';
import { nanoid } from 'nanoid';
import UserRepositoryPostgres from '../repository/UserRepositoryPostgres';
import pool from '../database/postgres/pool';
import AuthenticationRepositoryPostgres from '../repository/AuthenticationRepositoryPostgres';
import BcryptPasswordHash from '../security/BcryptPasswordHash';
import JwtAuthTokenCreator from '../security/JwtAuthTokenCreator';
import UserCreationUseCase from '../../Applications/use_cases/users/UserCreationUseCase';
import LoginUseCase from '../../Applications/use_cases/authentications/LoginUseCase';
import RefreshAuthenticationUseCase from '../../Applications/use_cases/authentications/RefreshAuthenticationUseCase';
import LogoutUseCase from '../../Applications/use_cases/authentications/LogoutUseCase';
import FileLogger from '../logging/local/FileLogger';

/** definitions  */
const useCaseParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'userRepository',
      internal: 'UserRepository',
    },
    {
      name: 'passwordHash',
      internal: 'PasswordHash',
    },
    {
      name: 'authTokenCreator',
      internal: 'AuthTokenCreator',
    },
    {
      name: 'authenticationRepository',
      internal: 'AuthenticationRepository',
    },
  ],
};

const repositoryParameter: ParameterOption = {
  injectType: 'destructuring',
  dependencies: [
    {
      name: 'pool',
      concrete: pool,
    },
    {
      name: 'idGenerator',
      concrete: nanoid,
    },
  ],
};

const container = createContainer();

/** repository */
container.register([
  {
    key: 'UserRepository',
    Class: UserRepositoryPostgres,
    parameter: repositoryParameter,
  },
  {
    key: 'AuthenticationRepository',
    Class: AuthenticationRepositoryPostgres,
    parameter: repositoryParameter,
  },
]);

/** security */
container.register([
  {
    key: 'PasswordHash',
    Class: BcryptPasswordHash,
  },
  {
    key: 'AuthTokenCreator',
    Class: JwtAuthTokenCreator,
  },
]);

/** logger */
container.register({
  key: 'Logger',
  Class: FileLogger,
});

/** use case */
container.register([
  {
    Class: UserCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: LoginUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: RefreshAuthenticationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: LogoutUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
