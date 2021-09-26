import Song from '../Song';

describe('Song', () => {
  it('should create song correctly', () => {
    const payload = {
      id: 'song-123',
      title: 'Viva la vida',
      performer: 'Coldplay',
    };

    const song = new Song(payload);

    expect(song).toBeInstanceOf(Song);
    expect(song.id).toEqual(payload.id);
    expect(song.title).toEqual(payload.title);
    expect(song.performer).toEqual(payload.performer);
  });
});
