/* eslint-disable no-unused-vars */

import AlbumCreation from '../entities/AlbumCreation';

interface AlbumRepository {
  isAlbumValid(albumId: string) : Promise<boolean>
  persist(albumCreation: AlbumCreation): Promise<string>
}

export default AlbumRepository;
