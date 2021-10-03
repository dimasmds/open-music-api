/* eslint-disable no-unused-vars */
import Song from '../entities/Song';
import SongCreation from '../entities/SongCreation';

interface SongRepository {
  isSongValid(songId: string): Promise<boolean>
  getSongsInAlbum(albumId: string): Promise<Song[] | null>
  persist(songCreation: SongCreation): Promise<string>
  getSongs(): Promise<Song[]>
}

export default SongRepository;
