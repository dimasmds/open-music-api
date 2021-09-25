import Jwt from '@hapi/jwt';
import JwtAuthTokenCreator from '../JwtAuthTokenCreator';
import config from '../../../Commons/config';

describe('JwtAuthTokenCreator', () => {
  const jwtAuthTokenCreator = new JwtAuthTokenCreator();

  describe('createAccessToken', () => {
    it('should create access token correctly based on payload', async () => {
      // Arrange
      const tokenPayload = {
        userId: 'user-123',
      };

      // Action
      const accessToken = await jwtAuthTokenCreator.createAccessToken(tokenPayload);

      // Assert
      const artifacts = Jwt.token.decode(accessToken);
      const { decoded: { payload } } = artifacts;
      expect(() => Jwt.token.verify(artifacts, config.security.accessTokenSecret)).not.toThrow();
      expect(payload.userId).toEqual(tokenPayload.userId);
      expect(payload.iat).toBeTruthy();
    });
  });

  describe('createRefreshToken', () => {
    it('should create refresh token correctly based on payload', async () => {
      // Arrange
      const tokenPayload = {
        userId: 'user-123',
      };

      // Action
      const refreshToken = await jwtAuthTokenCreator.createRefreshToken(tokenPayload);

      // Assert
      const artifacts = Jwt.token.decode(refreshToken);
      const { decoded: { payload } } = artifacts;
      expect(() => Jwt.token.verify(artifacts, config.security.refreshTokenSecret)).not.toThrow();
      expect(payload.userId).toEqual('user-123');
      expect(payload.iat).toBeTruthy();
    });
  });

  describe('getObjectPayload', () => {
    it('should return object payload from token correctly', async () => {
      // Assert
      const expectedTokenPayload = { userId: 'user-123' };
      const accessToken = await jwtAuthTokenCreator.createAccessToken(expectedTokenPayload);

      // Action
      const payload = await jwtAuthTokenCreator.getObjectPayload(accessToken);

      // Assert
      expect(payload.userId).toEqual(expectedTokenPayload.userId);
    });
  });

  describe('isRefreshTokenSignatureValid', () => {
    it('should return false if signature not valid', async () => {
      // Arrange
      const accessToken = await jwtAuthTokenCreator.createAccessToken({ userId: 'user-123' });

      // Action
      const isValid = await jwtAuthTokenCreator.isRefreshTokenSignatureValid(accessToken);

      // Assert
      expect(isValid).toBe(false);
    });

    it('should return true if signature valid', async () => {
      // Arrange
      const refreshToken = await jwtAuthTokenCreator.createRefreshToken({ userId: 'user-123' });

      // Action
      const isValid = await jwtAuthTokenCreator.isRefreshTokenSignatureValid(refreshToken);

      // Assert
      expect(isValid).toBe(true);
    });
  });
});
