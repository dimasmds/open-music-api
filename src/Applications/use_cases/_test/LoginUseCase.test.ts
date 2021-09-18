import UserRepository from '../../../Domains/users/repository/UserRepository';
import AuthenticationRepository from '../../../Domains/authentications/repository/AuthenticationRepository';
import AuthTokenCreator from '../../../Domains/authentications/security/AuthTokenCreator';
import PasswordHash from '../../../Domains/users/security/PasswordHash';
import LoginUseCase from '../LoginUseCase';

describe('LoginUseCase', () => {
  const mockUserRepository = <UserRepository>{};
  const mockAuthenticationRepository = <AuthenticationRepository>{};
  const mockAuthTokenCreator = <AuthTokenCreator>{};
  const mockPasswordHash = <PasswordHash>{};

  // stub!
  mockUserRepository.getPasswordByUsername = () => Promise.resolve('hashed!');
  mockUserRepository.getUserIdByUsername = () => Promise.resolve('user-123');
  mockPasswordHash.compare = () => Promise.resolve(true);
  mockAuthTokenCreator.createAccessToken = () => Promise.resolve('access_token');
  mockAuthTokenCreator.createRefreshToken = () => Promise.resolve('refresh_token');

  // mock
  mockAuthenticationRepository.persistRefreshToken = jest.fn(() => Promise.resolve());

  const loginUseCase = new LoginUseCase({
    userRepository: mockUserRepository,
    passwordHash: mockPasswordHash,
    authenticationRepository: mockAuthenticationRepository,
    authTokenCreator: mockAuthTokenCreator,
  });

  it('should orchestrating login flow correctly', async () => {
    // Arrange
    const useCasePayload = {
      username: 'dicoding',
      password: 'secret',
    };

    // Action
    const authentication = await loginUseCase.execute(useCasePayload);

    // Assert
    expect(authentication.accessToken).toEqual('access_token');
    expect(authentication.refreshToken).toEqual('refresh_token');
    expect(mockAuthenticationRepository.persistRefreshToken).toBeCalledWith('refresh_token');
  });
});
