/* eslint-disable no-unused-vars */

interface AuthenticationRepository {
  persistRefreshToken(refreshToken: string): Promise<void>
  deleteRefreshToken(refreshToken: string): Promise<void>
  isRefreshTokenRegistered(refreshToken: string): Promise<boolean>
}

export default AuthenticationRepository;
