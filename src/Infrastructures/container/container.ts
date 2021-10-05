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
import SongRepositoryPostgres from '../repository/SongRepositoryPostgres';
import AlbumRepositoryPostgres from '../repository/AlbumRepositoryPostgres';
import AlbumCreationUseCase from '../../Applications/use_cases/albums/AlbumCreationUseCase';
import DeleteAlbumUseCase from '../../Applications/use_cases/albums/DeleteAlbumUseCase';
import GetAlbumDetailUseCase from '../../Applications/use_cases/albums/GetAlbumDetailUseCase';
import UpdateAlbumUseCase from '../../Applications/use_cases/albums/UpdateAlbumUseCase';
import DeleteSongUseCase from '../../Applications/use_cases/songs/DeleteSongUseCase';
import GetDetailSongUseCase from '../../Applications/use_cases/songs/GetDetailSongUseCase';
import GetSongsUseCase from '../../Applications/use_cases/songs/GetSongsUseCase';
import SongCreationUseCase from '../../Applications/use_cases/songs/SongCreationUseCase';
import UpdateSongUseCase from '../../Applications/use_cases/songs/UpdateSongUseCase';

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
    {
      name: 'songRepository',
      internal: 'SongRepository',
    },
    {
      name: 'albumRepository',
      internal: 'AlbumRepository',
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
  {
    key: 'SongRepository',
    Class: SongRepositoryPostgres,
    parameter: repositoryParameter,
  },
  {
    key: 'AlbumRepository',
    Class: AlbumRepositoryPostgres,
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
  {
    Class: AlbumCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: DeleteAlbumUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: GetAlbumDetailUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: UpdateAlbumUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: DeleteSongUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: GetDetailSongUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: GetSongsUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: SongCreationUseCase,
    parameter: useCaseParameter,
  },
  {
    Class: UpdateSongUseCase,
    parameter: useCaseParameter,
  },
]);

export default container;
