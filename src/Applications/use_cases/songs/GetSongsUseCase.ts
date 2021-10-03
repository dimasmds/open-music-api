import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

class GetSongsUseCase {
  private songRepository: SongRepository;

  constructor({ songRepository }: UseCaseDependencies) {
    this.songRepository = songRepository;
  }

  async execute() {
    return this.songRepository.getSongs();
  }
}

export default GetSongsUseCase;
