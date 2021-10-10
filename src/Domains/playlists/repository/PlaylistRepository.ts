/* eslint-disable no-unused-vars */
import PlaylistCreation from '../entities/PlaylistCreation';

interface PlaylistRepository {
  persist(playlistCreation: PlaylistCreation) : Promise<string>
}

export default PlaylistRepository;
