import UserCreationUseCase from '../UserCreationUseCase';
import UserRepository from '../../../Domains/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';

describe('UserCreationUseCase', () => {
  const mockUserRepository = <UserRepository>{};
  const fakePasswordHash = <PasswordHash>{};
  fakePasswordHash.hash = () => Promise.resolve('stubbed!');

  const userCreationUseCase = new UserCreationUseCase({
    userRepository: mockUserRepository,
    passwordHash: fakePasswordHash,
  });

  describe('execute', () => {
    it('should orchestrating user creation flow correctly', async () => {
      // Arrange
      const useCasePayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };

      mockUserRepository.isRegisterUsernameAvailable = jest.fn(() => Promise.resolve(true));
      mockUserRepository.persist = jest.fn(() => Promise.resolve('user-123'));

      // Action
      const userId = await userCreationUseCase.execute(useCasePayload);

      // Assert
      expect(userId)
        .toEqual('user-123');
      expect(mockUserRepository.isRegisterUsernameAvailable)
        .toBeCalledWith(useCasePayload.username);
      expect(mockUserRepository.persist)
        .toBeCalled();
    });

    it('should throw error when username is not available', async () => {
      // Arrange
      const useCasePayload = {
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dicoding Indonesia',
      };
      mockUserRepository.isRegisterUsernameAvailable = jest.fn(() => Promise.resolve(false));

      // Action & Assert
      await expect(userCreationUseCase.execute(useCasePayload)).rejects.toThrowError('USER_CREATION_USE_CASE.USERNAME_ALREADY_TAKEN');
    });
  });
});
