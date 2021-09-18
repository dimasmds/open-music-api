import UserCreationUseCase from '../UserCreationUseCase';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import PasswordHash from '../../../Domains/users/security/PasswordHash';

describe('UserCreationUseCase', () => {
  const mockUserRepository = <UserRepository>{};
  const fakePasswordHash = <PasswordHash>{};

  fakePasswordHash.hash = () => Promise.resolve('stubbed!');
  mockUserRepository.isRegisterUsernameAvailable = () => Promise.resolve(true);

  mockUserRepository.persist = jest.fn(() => Promise.resolve('user-123'));

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

      // Action
      const userId = await userCreationUseCase.execute(useCasePayload);

      // Assert
      expect(userId).toEqual('user-123');
      expect(mockUserRepository.persist).toBeCalled();
    });
  });
});
