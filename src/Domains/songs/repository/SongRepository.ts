/* eslint-disable no-unused-vars */
interface SongRepository {
  isSongValid(songId: string): Promise<boolean>
}

export default SongRepository;
