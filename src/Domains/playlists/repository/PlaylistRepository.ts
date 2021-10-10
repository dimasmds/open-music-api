/* eslint-disable no-unused-vars */
import PlaylistCreation from '../entities/PlaylistCreation';
import Playlist from '../entities/Playlist';

interface PlaylistRepository {
  persist(playlistCreation: PlaylistCreation) : Promise<string>
  getPlaylists(userId: string): Promise<Playlist[]>
}

export default PlaylistRepository;
