/* eslint-disable no-unused-vars */

interface AuthTokenCreator {
  createAccessToken(payload: any): Promise<string>
  createRefreshToken(payload: any): Promise<string>
}

export default AuthTokenCreator;
