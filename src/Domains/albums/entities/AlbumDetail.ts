import Song from '../../songs/entities/Song';

type AlbumDetailPayload = {
  id: string,
  name: string,
  year: number,
  coverUrl: string,
  songs: Song[] | null
}

class AlbumDetail {
  public id: string;

  public name: string;

  public year: number;

  public songs: Song[] | null;

  private coverUrl: string;

  constructor({
    id, name, year, coverUrl, songs,
  }: AlbumDetailPayload) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.songs = songs;
    this.coverUrl = coverUrl;
  }
}

export default AlbumDetail;
