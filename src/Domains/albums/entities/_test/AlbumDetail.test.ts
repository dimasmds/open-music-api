import Song from '../../../songs/entities/Song';
import AlbumDetail from '../AlbumDetail';

describe('AlbumDetail', () => {
  it('should create correctly', () => {
    const songs: Song[] = [
      new Song({ id: 'song-123', title: 'Viva la vida', performer: 'Coldplay' }),
    ];

    const payload = {
      id: 'album-123',
      name: 'Viva la vida',
      year: 2006,
      songs,
    };

    const albumDetail = new AlbumDetail(payload);

    expect(albumDetail).toBeInstanceOf(AlbumDetail);
    expect(albumDetail.id).toEqual(payload.id);
    expect(albumDetail.name).toEqual(payload.name);
    expect(albumDetail.year).toEqual(payload.year);
    expect(albumDetail.songs).toEqual(payload.songs);
  });
});
