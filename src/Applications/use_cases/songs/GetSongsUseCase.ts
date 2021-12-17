import UseCaseDependencies from '../definitions/UseCaseDependencies';
import SongRepository from '../../../Domains/songs/repository/SongRepository';

type UseCasePayload = {
  title?: string,
  performer?: string,
};

class GetSongsUseCase {
  private songRepository: SongRepository;

  constructor({ songRepository }: UseCaseDependencies) {
    this.songRepository = songRepository;
  }

  async execute({ title, performer }: UseCasePayload) {
    return this.songRepository.getSongs(title, performer);
  }
}

export default GetSongsUseCase;
