import UserLogin from '../UserLogin';
import UserRepository from '../../UserRepository';
import PasswordHash from '../../../../Applications/security/PasswordHash';

describe('UserLogin', () => {
  const mockUserRepository = <UserRepository>{};
  const mockPasswordHash = <PasswordHash>{};
  const userLogin = new UserLogin(mockPasswordHash, mockUserRepository);

  describe('create', () => {
    it('should throw error when payload not contain username', async () => {
      // Action & Assert
      await expect(userLogin.create({}))
        .rejects
        .toThrowError('USER_LOGIN.NOT_CONTAIN_USERNAME');
    });

    it('should throw error when username not string', async () => {
      // Action & Assert
      await expect(userLogin.create({ username: 123 }))
        .rejects
        .toThrowError('USER_LOGIN.USERNAME_NOT_STRING');
    });

    it('should throw error when payload not contain password', async () => {
      // Action & Assert
      await expect(userLogin.create({ username: 'dicoding' }))
        .rejects
        .toThrowError('USER_LOGIN.NOT_CONTAIN_PASSWORD');
    });

    it('should throw error when password not string', async () => {
      // Action & Assert
      await expect(userLogin.create({ username: 'dicoding', password: 123 }))
        .rejects
        .toThrowError('USER_LOGIN.PASSWORD_NOT_STRING');
    });

    it('should throw error when password with specified username is null', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve(null));

      // Action & Assert
      await expect(userLogin.create({ username: 'dicoding', password: 'secret' }))
        .rejects
        .toThrowError('USER_LOGIN.USERNAME_NOT_FOUND');
      expect(mockUserRepository.getPasswordByUsername)
        .toBeCalledWith('dicoding');
    });

    it('should throw error when password not match', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve('hashed!'));
      mockPasswordHash.compare = jest.fn(() => Promise.resolve(false));

      // Action & Assert
      await expect(userLogin.create({ username: 'dicoding', password: 'secret' }))
        .rejects
        .toThrowError('USER_LOGIN.PASSWORD_NOT_MATCH');
      expect(mockPasswordHash.compare).toBeCalledWith('secret', 'hashed!');
    });

    it('should throw error when user id is null', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve('hashed!'));
      mockPasswordHash.compare = jest.fn(() => Promise.resolve(true));
      mockUserRepository.getUserIdByUsername = jest.fn(() => Promise.resolve(null));

      // Action & Assert
      await expect(userLogin.create({ username: 'dicoding', password: 'secret' }))
        .rejects
        .toThrowError('USER_LOGIN.USER_ID_NOT_FOUND');
      expect(mockUserRepository.getUserIdByUsername).toBeCalledWith('dicoding');
    });

    it('should contain username property when created properly', async () => {
      // Arrange
      mockUserRepository.getPasswordByUsername = jest.fn(() => Promise.resolve('hashed!'));
      mockPasswordHash.compare = jest.fn(() => Promise.resolve(true));
      mockUserRepository.getUserIdByUsername = jest.fn(() => Promise.resolve('user-123'));

      // Action
      const createdUserLogin = await userLogin.create({ username: 'dicoding', password: 'secret' });

      // Assert
      expect(createdUserLogin.userId).toEqual('user-123');
    });
  });
});
