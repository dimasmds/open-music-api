class Playlist {
  public id: string;

  public name: string;

  public username: string;

  constructor(id: string, name: string, username: string) {
    this.id = id;
    this.name = name;
    this.username = username;
  }
}

export default Playlist;
