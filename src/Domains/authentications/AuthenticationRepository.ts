/* eslint-disable no-unused-vars */

interface AuthenticationRepository {
  persistRefreshToken(refreshToken: string): Promise<void>
}

export default AuthenticationRepository;
