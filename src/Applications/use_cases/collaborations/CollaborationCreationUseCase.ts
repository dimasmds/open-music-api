import UseCaseDependencies from '../definitions/UseCaseDependencies';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import CollaborationRepository from '../../../Domains/collaborations/repositories/CollaborationRepository';
import CollaborationCreation from '../../../Domains/collaborations/entities/CollaborationCreation';

class CollaborationCreationUseCase {
  private readonly userRepository: UserRepository;

  private readonly playlistRepository: PlaylistRepository;

  private collaborationRepository: CollaborationRepository;

  constructor({
    userRepository, playlistRepository, collaborationRepository,
  }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.playlistRepository = playlistRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute(payload: any) {
    const collaborationCreation = new CollaborationCreation(
      this.userRepository, this.playlistRepository,
    );
    const newCollaboration = await collaborationCreation.create(payload);
    return this.collaborationRepository.persist(newCollaboration);
  }
}

export default CollaborationCreationUseCase;
