import PlaylistCreation from '../PlaylistCreation';
import UserRepository from '../../../users/repository/UserRepository';

describe('PlaylistCreation', () => {
  const mockUserRepository = <UserRepository>{};
  const playlistCreation = new PlaylistCreation(mockUserRepository);

  describe('create', () => {
    it('should throw error when payload not contain name', async () => {
      await expect(playlistCreation.create())
        .rejects
        .toThrow('PLAYLIST_CREATION.NOT_CONTAIN_NAME');
    });

    it('should throw error when name not string', async () => {
      await expect(playlistCreation.create({ name: 123 }))
        .rejects
        .toThrow('PLAYLIST_CREATION.NOT_STRING');
    });

    it('should throw error when name more than 50 character', async () => {
      await expect(playlistCreation.create({
        name: 'dicodingindonesiadicodingindonesiadicodingindonesiadicoding',
      }))
        .rejects
        .toThrow('PLAYLIST_CREATION.NAME_MORE_THAN_50_CHAR');
    });

    it('should throw error when not contain user id', async () => {
      await expect(playlistCreation.create({
        name: 'Viva la vida',
      }))
        .rejects
        .toThrow('PLAYLIST_CREATION.NOT_CONTAIN_USER_ID');
    });

    it('should throw error when user id not string', async () => {
      await expect(playlistCreation.create({
        name: 'Viva la vida',
        userId: 123,
      }))
        .rejects
        .toThrow('PLAYLIST_CREATION.USER_ID_NOT_STRING');
    });

    it('should throw error when user id not valid', async () => {
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(false));

      await expect(playlistCreation.create({
        name: 'Viva la vida',
        userId: 'user-123',
      }))
        .rejects
        .toThrow('PLAYLIST_CREATION.USER_ID_NOT_VALID');
      expect(mockUserRepository.isUserIdValid).toBeCalledWith('user-123');
    });

    it('should create playlist creation correctly', async () => {
      mockUserRepository.isUserIdValid = jest.fn(() => Promise.resolve(true));

      const payload = {
        name: 'Viva la vida',
        userId: 'user-123',
      };

      const createdPlaylistCreation = await playlistCreation.create(payload);

      expect(createdPlaylistCreation.name).toEqual(payload.name);
      expect(createdPlaylistCreation.userId).toEqual(payload.userId);
    });
  });
});
