import CollaborationCreation from '../CollaborationCreation';
import UserRepository from '../../../users/repository/UserRepository';
import PlaylistRepository from '../../../playlists/repository/PlaylistRepository';

describe('CollaborationCreation', () => {
  const mockUserRepository = <UserRepository>{};
  const mockPlaylistRepository = <PlaylistRepository>{};

  const collaborationCreation = new CollaborationCreation(
    mockUserRepository, mockPlaylistRepository,
  );

  describe('create', () => {
    it('should throw error when payload not contain playlist id', async () => {
      await expect(collaborationCreation.create()).rejects.toThrowError('COLLABORATION_CREATION.PLAYLIST_ID_REQUIRED');
    });

    it('should throw error when playlist id not string', async () => {
      const payload = {
        playlistId: 1,
      };

      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.PLAYLIST_ID_SHOULD_BE_STRING');
    });

    it('should throw error when payload not contain user id', async () => {
      const payload = {
        playlistId: '1',
      };

      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.USER_ID_REQUIRED');
    });

    it('should throw error when user id not string', async () => {
      const payload = {
        playlistId: '1',
        userId: 1,
      };

      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.USER_ID_SHOULD_BE_STRING');
    });

    it('should throw error when not contain owner id', async () => {
      const payload = {
        playlistId: '1',
        userId: '1',
      };

      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.OWNER_ID_REQUIRED');
    });

    it('should throw error when owner id not string', async () => {
      const payload = {
        playlistId: '1',
        userId: '1',
        ownerId: 1,
      };

      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.OWNER_ID_SHOULD_BE_STRING');
    });

    it('should throw error when user is not found', async () => {
      // Arrange
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(false));

      const payload = {
        playlistId: '1',
        userId: '1',
        ownerId: '1',
      };

      // Action & Assert
      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.USER_NOT_FOUND');
      expect(mockUserRepository.isUserIdValid).toHaveBeenCalledWith('1');
    });

    it('should throw error when playlist is not found', async () => {
      // Arrange
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isPlaylistIdValid = jest.fn(() => Promise.resolve(false));

      const payload = {
        playlistId: '1',
        userId: '1',
        ownerId: '1',
      };

      // Action & Assert
      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.PLAYLIST_NOT_FOUND');
      expect(mockUserRepository.isUserIdValid).toHaveBeenCalledWith('1');
      expect(mockPlaylistRepository.isPlaylistIdValid).toHaveBeenCalledWith('1');
    });

    it('should throw error when auth user is not an owner playlist', async () => {
      // Arrange
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isPlaylistIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isAnOwnerPlaylist = jest.fn(() => Promise.resolve(false));

      const payload = {
        playlistId: '1',
        userId: '1',
        ownerId: '1',
      };

      // Action & Assert
      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.AUTH_USER_NOT_AN_OWNER');
      expect(mockUserRepository.isUserIdValid).toHaveBeenCalledWith('1');
      expect(mockPlaylistRepository.isPlaylistIdValid).toHaveBeenCalledWith('1');
      expect(mockPlaylistRepository.isAnOwnerPlaylist).toHaveBeenCalledWith('1', '1');
    });

    it('should throw error when collaborator is an owner playlist', async () => {
      // Arrange
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isPlaylistIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isAnOwnerPlaylist = jest.fn(() => Promise.resolve(true));

      const payload = {
        playlistId: '1',
        userId: '1',
        ownerId: '1',
      };

      // Action & Assert
      await expect(collaborationCreation.create(payload)).rejects.toThrowError('COLLABORATION_CREATION.USER_IS_PLAYLIST_OWNER');

      expect(mockUserRepository.isUserIdValid).toHaveBeenCalledWith('1');
      expect(mockPlaylistRepository.isPlaylistIdValid).toHaveBeenCalledWith('1');
      expect(mockPlaylistRepository.isAnOwnerPlaylist).toHaveBeenCalledWith('1', '1');
    });

    it('should create CollaborationCreation properly', async () => {
      // Arrange
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isPlaylistIdValid = jest.fn(() => Promise.resolve(true));
      mockPlaylistRepository.isAnOwnerPlaylist = jest.fn((_, userId) => {
        if (userId === '2') {
          return Promise.resolve(false);
        }
        return Promise.resolve(true);
      });

      const payload = {
        playlistId: '1',
        userId: '2',
        ownerId: '1',
      };

      // Action
      const result = await collaborationCreation.create(payload);

      // Assert
      expect(result.userId).toBe(payload.userId);
      expect(result.playlistId).toBe(payload.playlistId);
    });
  });
});
