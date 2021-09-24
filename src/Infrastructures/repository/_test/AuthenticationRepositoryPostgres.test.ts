import AuthenticationRepositoryPostgres from '../AuthenticationRepositoryPostgres';
import pool from '../../database/postgres/pool';
import AuthenticationsTableTestHelper from './_helper/AuthenticationsTableTestHelper';

describe('AuthenticationRepositoryPostgres', () => {
  const authenticationRepositoryPostgres = new AuthenticationRepositoryPostgres({ pool });

  beforeEach(async () => {
    await AuthenticationsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('persistRefreshToken', () => {
    it('should persist refresh token to database', async () => {
      // Arrange
      const refreshToken = 'refresh_token';

      // Action
      await authenticationRepositoryPostgres.persistRefreshToken(refreshToken);

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findTokens(refreshToken);
      expect(tokens).toHaveLength(1);
      expect(tokens[0].token).toEqual(refreshToken);
    });
  });

  describe('deleteRefreshToken', () => {
    it('should delete the refresh token from database', async () => {
      // Arrange
      await AuthenticationsTableTestHelper.insertToken('refresh_token');

      // Action
      await authenticationRepositoryPostgres.deleteRefreshToken('refresh_token');

      // Assert
      const tokens = await AuthenticationsTableTestHelper.findTokens('refresh_token');
      expect(tokens).toHaveLength(0);
    });
  });

  describe('isRefreshTokenRegistered', () => {
    it('should return true if token found in database', async () => {
      // Arrange
      await AuthenticationsTableTestHelper.insertToken('refresh_token');

      // Action
      const isTokenRegistered = await authenticationRepositoryPostgres.isRefreshTokenRegistered('refresh_token');

      // Assert
      expect(isTokenRegistered).toEqual(true);
    });

    it('should return false if token not found in database', async () => {
      // Action
      const isToenRegistered = await authenticationRepositoryPostgres.isRefreshTokenRegistered('refresh_token');

      // Assert
      expect(isToenRegistered).toEqual(false);
    });
  });
});
