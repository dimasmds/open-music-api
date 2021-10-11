import Song from '../../songs/entities/Song';

class PlaylistDetail {
  public id: string;

  public name: string;

  public username: string;

  public songs: Song[] | null;

  constructor(id: string, name: string, username: string, songs: Song[] | null = null) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.songs = songs;
  }
}

export default PlaylistDetail;
