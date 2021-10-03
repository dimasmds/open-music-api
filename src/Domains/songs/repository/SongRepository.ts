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
  getSongs(): Promise<Song[]>
  update(songUpdate: SongUpdate): Promise<void>
}

export default SongRepository;
