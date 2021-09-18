import AuthenticationRepository from '../../repository/AuthenticationRepository';
import AuthTokenCreator from '../../security/AuthTokenCreator';
import RefreshAuthentication from '../RefreshAuthentication';

describe('RefreshAuthentication', () => {
  const mockAuthenticationRepository = <AuthenticationRepository>{};
  const mockAuthTokenCreator = <AuthTokenCreator>{};

  const refreshAuthentication = new RefreshAuthentication(
    mockAuthenticationRepository,
    mockAuthTokenCreator,
  );

  describe('create', () => {
    it('should throw error when payload not contain refreshToken', async () => {
      // Action & Assert
      await expect(refreshAuthentication.create({}))
        .rejects
        .toThrowError('REFRESH_AUTHENTICATION.NOT_CONTAIN_REFRESH_TOKEN');
    });

    it('should throw error when refreshToken not string', async () => {
      // Action & Assert
      await expect(refreshAuthentication.create({ refreshToken: 123 }))
        .rejects
        .toThrowError('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_STRING');
    });

    it('should throw error when refreshToken not contain valid signature', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      };
      mockAuthTokenCreator.isSignatureValid = jest.fn(() => Promise.resolve(false));

      // Action & Assert
      await expect(refreshAuthentication.create(payload))
        .rejects
        .toThrowError('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_HAVE_VALID_SIGNATURE');
      expect(mockAuthTokenCreator.isSignatureValid).toBeCalledWith('refresh_token');
    });

    it('should throw error when refreshToken not registered in database', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      };

      mockAuthTokenCreator.isSignatureValid = () => Promise.resolve(true);

      mockAuthenticationRepository.isRefreshTokenRegistered = jest.fn(() => Promise.resolve(false));

      // Action & Assert
      await expect(refreshAuthentication.create(payload))
        .rejects
        .toThrowError('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_REGISTERED');
      expect(mockAuthenticationRepository.isRefreshTokenRegistered).toBeCalledWith('refresh_token');
    });

    it('should contain access token when create correctly ', async () => {
      // Arrange
      const payload = {
        refreshToken: 'refresh_token',
      };
      mockAuthTokenCreator.isSignatureValid = () => Promise.resolve(true);
      mockAuthenticationRepository.isRefreshTokenRegistered = () => Promise.resolve(true);

      mockAuthTokenCreator.getObjectPayload = jest.fn(() => Promise.resolve({ userId: 'user-123', iat: 123123 }));
      mockAuthTokenCreator.createAccessToken = jest.fn(() => Promise.resolve('new_access_token'));

      // Action
      const createdRefreshAuthentication = await refreshAuthentication.create(payload);

      // Assert
      expect(createdRefreshAuthentication.accessToken).toEqual('new_access_token');
      expect(mockAuthTokenCreator.getObjectPayload).toBeCalledWith('refresh_token');
      expect(mockAuthTokenCreator.createAccessToken).toBeCalledWith({ userId: 'user-123' });
    });
  });
});
