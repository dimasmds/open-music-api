/* eslint-disable no-unused-vars */

import AlbumCreation from '../entities/AlbumCreation';
import AlbumDetail from '../entities/AlbumDetail';
import AlbumUpdate from '../entities/AlbumUpdate';

interface AlbumRepository {
  isAlbumValid(albumId: string) : Promise<boolean>
  persist(albumCreation: AlbumCreation): Promise<string>
  getAlbumById(albumId: string) : Promise<AlbumDetail>
  updateAlbum(albumUpdate: AlbumUpdate): Promise<void>
  deleteAlbum(albumId: string) : Promise<void>
}

export default AlbumRepository;
