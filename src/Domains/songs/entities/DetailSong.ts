type DetailSongPayload = {
  id: string,
  title: string,
  year: number,
  performer: string,
  genre: string,
  duration: number | null,
  albumId: string | null
}

class DetailSong {
  public id: string;

  public title: string;

  public year: number;

  public performer: string;

  public genre: string;

  public duration: number | null;

  public albumId: string | null;

  constructor({
    id, title, year, performer, genre, duration, albumId,
  } : DetailSongPayload) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.performer = performer;
    this.genre = genre;
    this.duration = duration;
    this.albumId = albumId;
  }
}

export default DetailSong;
