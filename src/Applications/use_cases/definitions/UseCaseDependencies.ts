import UserRepository from '../../../Domains/users/repository/UserRepository';
import PasswordHash from '../../../Domains/users/security/PasswordHash';
import AuthenticationRepository from '../../../Domains/authentications/repository/AuthenticationRepository';
import AuthTokenCreator from '../../../Domains/authentications/security/AuthTokenCreator';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import CollaborationRepository from '../../../Domains/collaborations/repositories/CollaborationRepository';
import ActivitiesRepository from '../../../Domains/activities/repository/ActivitiesRepository';
import PlaylistExportService from '../../../Domains/playlists/service/PlaylistExportService';

interface UseCaseDependencies {
  userRepository?: UserRepository
  authenticationRepository?: AuthenticationRepository
  albumRepository?: AlbumRepository
  songRepository?: SongRepository
  passwordHash?: PasswordHash
  authTokenCreator?: AuthTokenCreator,
  playlistRepository?: PlaylistRepository,
  collaborationRepository?: CollaborationRepository,
  activitiesRepository?: ActivitiesRepository,
  playlistExportService?: PlaylistExportService,
}

export default UseCaseDependencies;
