/* eslint-disable no-unused-vars */
import PlaylistCreation from '../entities/PlaylistCreation';
import Playlist from '../entities/Playlist';
import PlaylistDetail from '../entities/PlaylistDetail';

interface PlaylistRepository {
  persist(playlistCreation: PlaylistCreation) : Promise<string>
  getPlaylists(userId: string): Promise<Playlist[]>
  getPlaylist(playlistId: string): Promise<PlaylistDetail>
  isPlaylistIdValid(playlistId: string): Promise<boolean>
  isAnOwnerPlaylist(playlistId: string, userId: string): Promise<boolean>
}

export default PlaylistRepository;
