class AlbumCreation {
  public name: string;

  public year: string;

  async create(payload: any): Promise<AlbumCreation> {
    AlbumCreation.verifyPayload(payload);

    const { name, year } = payload;

    this.name = name;
    this.year = year;
    return this;
  }

  private static verifyPayload(payload: any) {
    const { name, year } = payload;

    if (!name) {
      throw new Error('ALBUM_CREATION.NOT_CONTAIN_NAME');
    }

    if (typeof name !== 'string') {
      throw new Error('ALBUM_CREATION.NAME_NOT_STRING');
    }

    if (year === undefined) {
      throw new Error('ALBUM_CREATION.NOT_CONTAIN_YEAR');
    }

    if (typeof year !== 'number') {
      throw new Error('ALBUM_CREATION.YEAR_NOT_NUMBER');
    }

    if (year % 1 !== 0) {
      throw new Error('ALBUM_CREATION.YEAR_CANNOT_DECIMAL');
    }
  }
}

export default AlbumCreation;
