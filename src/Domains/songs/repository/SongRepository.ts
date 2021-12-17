/* eslint-disable no-unused-vars */
import Song from '../entities/Song';
import SongCreation from '../entities/SongCreation';
import SongDetail from '../entities/SongDetail';
import SongUpdate from '../entities/SongUpdate';

interface SongRepository {
  isSongValid(songId: string): Promise<boolean>
  getSongById(id: string): Promise<SongDetail | null>
  getSongsInAlbum(albumId: string): Promise<Song[] | null>
  persist(songCreation: SongCreation): Promise<string>
  getSongs(title?: string, performer?: string): Promise<Song[]>
  update(songUpdate: SongUpdate): Promise<void>
  deleteSongById(songId: string): Promise<void>
  getSongsInPlaylist(playlistId: string) : Promise<Song[]>
}

export default SongRepository;
