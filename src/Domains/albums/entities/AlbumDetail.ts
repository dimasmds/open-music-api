import Song from '../../songs/entities/Song';

type AlbumDetailPayload = {
  id: string,
  name: string,
  year: number,
  songs: Song[] | null
}

class AlbumDetail {
  public id: string;

  public name: string;

  public year: number;

  public songs: Song[] | null;

  constructor({
    id, name, year, songs,
  }: AlbumDetailPayload) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.songs = songs;
  }
}

export default AlbumDetail;
