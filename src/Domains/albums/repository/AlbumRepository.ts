/* eslint-disable no-unused-vars */

interface AlbumRepository {
  isAlbumValid(albumId: string) : Promise<boolean>
}

export default AlbumRepository;
