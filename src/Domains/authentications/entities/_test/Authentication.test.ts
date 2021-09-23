import Authentication from '../Authentication';
import AuthTokenCreator from '../../security/AuthTokenCreator';

describe('Authentication', () => {
  const mockAuthTokenCreator = <AuthTokenCreator>{};
  mockAuthTokenCreator.createAccessToken = jest.fn(() => Promise.resolve('access_token'));
  mockAuthTokenCreator.createRefreshToken = jest.fn(() => Promise.resolve('refresh_token'));
  const authentication = new Authentication(mockAuthTokenCreator);

  describe('create', () => {
    it('should throw error when payload not contain userId', async () => {
      // Action & Assert
      await expect(authentication.create({}))
        .rejects
        .toThrowError('AUTHENTICATION.NOT_CONTAIN_USER_ID');
    });

    it('should throw error when userId not string', async () => {
      // Action & Assert
      await expect(authentication.create({ userId: 123 }))
        .rejects
        .toThrowError('AUTHENTICATION.USER_ID_NOT_STRING');
    });

    it('should contain accessToken & refreshToken property when create properly', async () => {
      // Action
      const payload = { userId: 'user-123' };
      const createdAuthentication = await authentication.create(payload);

      // Assert
      expect(createdAuthentication.accessToken).toEqual('access_token');
      expect(createdAuthentication.refreshToken).toEqual('refresh_token');
      expect(mockAuthTokenCreator.createAccessToken).toBeCalledWith({ userId: 'user-123' });
      expect(mockAuthTokenCreator.createRefreshToken).toBeCalledWith({ userId: 'user-123' });
    });
  });
});
