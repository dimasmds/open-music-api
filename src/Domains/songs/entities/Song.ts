type SongPayload = {
  id: string,
  title: string,
  performer: string
}

class Song {
  public id: string;

  public title: string;

  public performer: string;

  constructor({ id, title, performer }: SongPayload) {
    this.id = id;
    this.title = title;
    this.performer = performer;
  }
}

export default Song;
