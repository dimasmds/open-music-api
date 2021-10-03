import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

class GetDetailSongUseCase {
  private songRepository: SongRepository;

  constructor({ songRepository }: UseCaseDependencies) {
    this.songRepository = songRepository;
  }

  async execute(payload: any = {}) {
    GetDetailSongUseCase.verifyPayload(payload);
    const { id } = payload;
    const song = this.songRepository.getSongById(id);

    if (song === null) {
      throw new Error('GET_DETAIL_SONG.SONG_NOT_FOUND');
    }

    return song;
  }

  private static verifyPayload({ id }: any) {
    if (!id) {
      throw new Error('GET_DETAIL_SONG.ID_NOT_DEFINED');
    }

    if (typeof id !== 'string') {
      throw new Error('GET_DETAIL_SONG.ID_NOT_STRING');
    }
  }
}

export default GetDetailSongUseCase;
