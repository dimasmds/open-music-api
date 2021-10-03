/* eslint-disable no-unused-vars */
import Song from '../entities/Song';

interface SongRepository {
  isSongValid(songId: string): Promise<boolean>
  getSongsInAlbum(albumId: string): Promise<Song[] | null>
}

export default SongRepository;
