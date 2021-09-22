import LogoutUseCase from '../LogoutUseCase';
import AuthenticationRepository from '../../../../Domains/authentications/repository/AuthenticationRepository';

describe('LogoutUseCase', () => {
  const mockAuthenticationRepository = <AuthenticationRepository>{};
  const logoutUseCase = new LogoutUseCase({
    authenticationRepository: mockAuthenticationRepository,
  });

  describe('execute', () => {
    it('should throw error when payload not contain refresh token', async () => {
      await expect(logoutUseCase.execute({}))
        .rejects
        .toThrowError('LOGOUT.NOT_CONTAIN_REFRESH_TOKEN');
    });

    it('should throw error when payload refresh token not string', async () => {
      await expect(logoutUseCase.execute({ refreshToken: 123 }))
        .rejects
        .toThrowError('LOGOUT.REFRESH_TOKEN_NOT_STRING');
    });

    it('should throw error when refresh token not registered on database', async () => {
      // Arrange
      mockAuthenticationRepository.isRefreshTokenRegistered = jest.fn(() => Promise.resolve(false));
      const payload = {
        refreshToken: 'refresh_token',
      };

      // Action & Arrange
      await expect(logoutUseCase.execute(payload))
        .rejects
        .toThrowError('LOGOUT.REFRESH_TOKEN_NOT_REGISTERED_IN_DATABASE');
      expect(mockAuthenticationRepository.isRefreshTokenRegistered)
        .toBeCalledWith(payload.refreshToken);
    });

    it('should delete refresh token from database when refresh token registered', async () => {
      // Arrange
      mockAuthenticationRepository.isRefreshTokenRegistered = jest.fn(() => Promise.resolve(true));
      mockAuthenticationRepository.deleteRefreshToken = jest.fn(() => Promise.resolve());
      const payload = {
        refreshToken: 'refresh_token',
      };

      // Action
      await logoutUseCase.execute(payload);

      // Assert
      expect(mockAuthenticationRepository.deleteRefreshToken).toBeCalledWith(payload.refreshToken);
    });
  });
});
