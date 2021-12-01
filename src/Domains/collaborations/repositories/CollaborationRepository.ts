/* eslint-disable no-unused-vars */
import CollaborationCreation from '../entities/CollaborationCreation';
import CollaborationDeletion from '../entities/CollaborationDeletion';

interface CollaborationRepository {
  persist(collaborationCreation: CollaborationCreation) : Promise<string>
  delete(collaborationDeletion: CollaborationDeletion) : Promise<void>
}

export default CollaborationRepository;
