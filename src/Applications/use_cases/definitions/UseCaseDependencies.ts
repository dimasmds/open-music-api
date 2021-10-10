import UserRepository from '../../../Domains/users/repository/UserRepository';
import PasswordHash from '../../../Domains/users/security/PasswordHash';
import AuthenticationRepository from '../../../Domains/authentications/repository/AuthenticationRepository';
import AuthTokenCreator from '../../../Domains/authentications/security/AuthTokenCreator';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';

interface UseCaseDependencies {
  userRepository?: UserRepository
  authenticationRepository?: AuthenticationRepository
  albumRepository?: AlbumRepository
  songRepository?: SongRepository
  passwordHash?: PasswordHash
  authTokenCreator?: AuthTokenCreator,
  playlistRepository?: PlaylistRepository
}

export default UseCaseDependencies;
