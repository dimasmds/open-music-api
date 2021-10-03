/* eslint-disable no-unused-vars */

import AlbumCreation from '../entities/AlbumCreation';
import AlbumDetail from '../entities/AlbumDetail';

interface AlbumRepository {
  isAlbumValid(albumId: string) : Promise<boolean>
  persist(albumCreation: AlbumCreation): Promise<string>
  getAlbumById(albumId: string) : Promise<AlbumDetail>
}

export default AlbumRepository;
