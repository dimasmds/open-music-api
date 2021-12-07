/* eslint-disable no-unused-vars */

import AlbumCreation from '../entities/AlbumCreation';
import AlbumDetail from '../entities/AlbumDetail';
import AlbumUpdate from '../entities/AlbumUpdate';

export type LikeCountSource = {
  count: number,
  source: 'database' | 'cache',
}

interface AlbumRepository {
  isAlbumValid(albumId: string) : Promise<boolean>
  persist(albumCreation: AlbumCreation): Promise<string>
  getAlbumById(albumId: string) : Promise<AlbumDetail>
  updateAlbum(albumUpdate: AlbumUpdate): Promise<void>
  deleteAlbum(albumId: string) : Promise<void>
  updateCoverUrl(albumId: string, coverUrl: string) : Promise<void>
  likeAlbum(userId: string, albumId: string) : Promise<void>
  unlikeAlbum(userId: string, albumId: string) : Promise<void>
  isAlbumLikedByUser(albumId: string, userId: string) : Promise<boolean>
  getLikeCount(albumId: string): Promise<LikeCountSource>
}

export default AlbumRepository;
