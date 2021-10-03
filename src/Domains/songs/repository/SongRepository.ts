/* eslint-disable no-unused-vars */
import Song from '../entities/Song';
import SongCreation from '../entities/SongCreation';
import SongDetail from '../entities/SongDetail';

interface SongRepository {
  isSongValid(songId: string): Promise<boolean>
  getSongById(id: string): Promise<SongDetail | null>
  getSongsInAlbum(albumId: string): Promise<Song[] | null>
  persist(songCreation: SongCreation): Promise<string>
  getSongs(): Promise<Song[]>
}

export default SongRepository;
