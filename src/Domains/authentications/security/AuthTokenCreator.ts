/* eslint-disable no-unused-vars */

interface AuthTokenCreator {
  createAccessToken(payload: any): Promise<string>
  createRefreshToken(payload: any): Promise<string>
  isRefreshTokenSignatureValid(token: string): Promise<boolean>
  getObjectPayload(token: string): Promise<any>
}

export default AuthTokenCreator;
