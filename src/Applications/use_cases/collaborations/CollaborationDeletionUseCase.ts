import UseCaseDependencies from '../definitions/UseCaseDependencies';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import CollaborationRepository
  from '../../../Domains/collaborations/repositories/CollaborationRepository';
import CollaborationDeletion from '../../../Domains/collaborations/entities/CollaborationDeletion';

class CollaborationDeletionUseCase {
  private readonly userRepository: UserRepository;

  private readonly playlistRepository: PlaylistRepository;

  private collaborationRepository: CollaborationRepository;

  constructor({
    userRepository,
    playlistRepository,
    collaborationRepository,
  }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.playlistRepository = playlistRepository;
    this.collaborationRepository = collaborationRepository;
  }

  async execute(payload: any) {
    const collaborationDeletion = new CollaborationDeletion(
      this.playlistRepository, this.userRepository,
    );

    const collaborationDelete = await collaborationDeletion.delete(payload);

    return this.collaborationRepository.delete(collaborationDelete);
  }
}

export default CollaborationDeletionUseCase;
