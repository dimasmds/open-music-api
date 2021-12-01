/* eslint-disable no-unused-vars */
import CollaborationCreation from '../entities/CollaborationCreation';

interface CollaborationRepository {
  persist(collaborationCreation: CollaborationCreation) : Promise<string>
}

export default CollaborationRepository;
