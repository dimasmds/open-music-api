import RefreshAuthenticationUseCase from '../RefreshAuthenticationUseCase';
import AuthTokenCreator from '../../../../Domains/authentications/security/AuthTokenCreator';
import AuthenticationRepository from '../../../../Domains/authentications/repository/AuthenticationRepository';

describe('RefreshAuthenticationUseCase', () => {
  const mockAuthTokenCreator = <AuthTokenCreator>{};
  const mockAuthenticationRepository = <AuthenticationRepository>{};

  mockAuthTokenCreator.isRefreshTokenSignatureValid = jest.fn(() => Promise.resolve(true));
  mockAuthTokenCreator.getObjectPayload = jest.fn(() => Promise.resolve({ userId: 'user-123', iat: 123 }));
  mockAuthTokenCreator.createAccessToken = jest.fn(() => Promise.resolve('new_access_token'));
  mockAuthenticationRepository.isRefreshTokenRegistered = jest.fn(() => Promise.resolve(true));

  const refreshAuthenticationUseCase = new RefreshAuthenticationUseCase({
    authTokenCreator: mockAuthTokenCreator,
    authenticationRepository: mockAuthenticationRepository,
  });

  describe('execute', () => {
    it('should orchestrating refresh authentication flow correctly', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      };

      // Action
      const accessToken = await refreshAuthenticationUseCase.execute(payload);

      // Assert
      expect(accessToken).toEqual('new_access_token');
      expect(mockAuthTokenCreator.isRefreshTokenSignatureValid).toBeCalled();
      expect(mockAuthTokenCreator.getObjectPayload).toBeCalledWith(payload.refreshToken);
      expect(mockAuthenticationRepository.isRefreshTokenRegistered).toBeCalledWith('refresh_token');
      expect(mockAuthTokenCreator.createAccessToken).toBeCalledWith({ userId: 'user-123' });
    });
  });
});
