/* istanbul ignore file */
/**
 * @TODO not test yet
 */

import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

class DeleteSongUseCase {
  private songRepository: SongRepository;

  constructor({ songRepository } : UseCaseDependencies) {
    this.songRepository = songRepository;
  }

  async execute(payload: any = {}) {
    DeleteSongUseCase.verifyPayload(payload);

    const { id } = payload;

    const isSongValid = await this.songRepository.isSongValid(id);

    if (!isSongValid) {
      throw new Error('DELETE_SONG.SONG_NOT_VALID');
    }

    await this.songRepository.deleteSongById(id);
  }

  private static verifyPayload({ id } : any) {
    if (!id) {
      throw new Error('DELETE_SONG.ID_NOT_DEFINED');
    }

    if (typeof id !== 'string') {
      throw new Error('DELETE_SONG.ID_NOT_STRING');
    }
  }
}

export default DeleteSongUseCase;
