/* eslint-disable no-unused-vars */
import PlaylistCreation from '../entities/PlaylistCreation';
import Playlist from '../entities/Playlist';
import PlaylistDetail from '../entities/PlaylistDetail';
import PlaylistSongCreation from '../entities/PlaylistSongCreation';

interface PlaylistRepository {
  persist(playlistCreation: PlaylistCreation) : Promise<string>
  persistSongToPlaylist(playlistSongCreation: PlaylistSongCreation) : Promise<void>
  getPlaylists(userId: string): Promise<Playlist[]>
  getPlaylist(playlistId: string): Promise<PlaylistDetail>
  isPlaylistIdValid(playlistId: string): Promise<boolean>
  isAnOwnerPlaylist(playlistId: string, userId: string): Promise<boolean>
  deletePlaylist(playlistId: string): Promise<void>
  deleteSongInPlaylist(playlistId: string, songId: string): Promise<void>
}

export default PlaylistRepository;
