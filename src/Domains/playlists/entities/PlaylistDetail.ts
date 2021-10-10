import Song from '../../songs/entities/Song';

class PlaylistDetail {
  public id: string;

  public name: string;

  public username: string;

  public songs: Song[];

  constructor(id: string, name: string, username: string, songs: Song[]) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.songs = songs;
  }
}

export default PlaylistDetail;
