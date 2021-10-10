import UseCaseDependencies from '../definitions/UseCaseDependencies';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import PlaylistCreation from '../../../Domains/playlists/entities/PlaylistCreation';

class PlaylistCreationUseCase {
  private playlistRepository: PlaylistRepository;

  private readonly userRepository: UserRepository;

  constructor({ playlistRepository, userRepository }: UseCaseDependencies) {
    this.playlistRepository = playlistRepository;
    this.userRepository = userRepository;
  }

  async execute(useCasePayload: any) {
    const playlistCreation = new PlaylistCreation(this.userRepository);

    await playlistCreation.create(useCasePayload);

    return this.playlistRepository.persist(playlistCreation);
  }
}

export default PlaylistCreationUseCase;
