import DetailSong from '../DetailSong';

describe('DetailSong', () => {
  it('should create instance correctly', () => {
    const payload = {
      id: 'song-123',
      title: 'Viva la vida',
      year: 2008,
      performer: 'Coldplay',
      genre: 'Indie',
      duration: 120,
      albumId: 'album-123',
    };

    const detailSong = new DetailSong(payload);

    expect(detailSong).toBeInstanceOf(DetailSong);
    expect(detailSong.id).toEqual(payload.id);
    expect(detailSong.title).toEqual(payload.title);
    expect(detailSong.year).toEqual(payload.year);
    expect(detailSong.performer).toEqual(payload.performer);
    expect(detailSong.genre).toEqual(payload.genre);
    expect(detailSong.duration).toEqual(payload.duration);
    expect(detailSong.albumId).toEqual(payload.albumId);
  });
});
