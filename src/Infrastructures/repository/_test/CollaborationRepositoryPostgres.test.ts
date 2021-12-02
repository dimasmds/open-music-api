import CollaborationRepositoryPostgres from '../CollaborationRepositoryPostgres';
import pool from '../../database/postgres/pool';
import PlaylistsTableTestHelper from './_helper/PlaylistsTableTestHelper';
import UsersTableTestHelper from './_helper/UsersTableTestHelper';
import CollaborationsTableTestHelper from './_helper/CollaborationsTableTestHelper';
import CollaborationCreation from '../../../Domains/collaborations/entities/CollaborationCreation';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';

describe('CollaborationRepositoryPostgres', () => {
  const fakeIdGenerator = () => '123';
  const collaborationRepositoryPostgres = new CollaborationRepositoryPostgres({
    pool,
    idGenerator: fakeIdGenerator,
  });

  beforeEach(async () => {
    await PlaylistsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await CollaborationsTableTestHelper.cleanTable();
  });

  describe('persist', () => {
    it('should persist collaboration to database', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dimasmds' });
      await UsersTableTestHelper.addUser({ id: 'user-456', username: 'dicoding' });
      await PlaylistsTableTestHelper.addPlaylist({ owner: 'user-123' });
      const collaborationCreation = new CollaborationCreation(
        <UserRepository>{}, <PlaylistRepository>{},
      );
      collaborationCreation.playlistId = 'playlist-123';
      collaborationCreation.userId = 'user-456';

      // Action
      const collaborationId = await collaborationRepositoryPostgres.persist(collaborationCreation);

      // Assert
      const collaborations = await CollaborationsTableTestHelper.findCollaboration({ playlistId: 'playlist-123', userId: 'user-456' });
      expect(collaborations.length).toBe(1);
      expect(collaborationId).toBe('collaboration-123');
    });
  });
});
