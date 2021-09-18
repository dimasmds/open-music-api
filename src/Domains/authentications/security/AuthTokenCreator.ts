/* eslint-disable no-unused-vars */

interface AuthTokenCreator {
  createAccessToken(payload: any): Promise<string>
  createRefreshToken(payload: any): Promise<string>
  isSignatureValid(token: string): Promise<boolean>
  getObjectPayload(token: string): Promise<any>
}

export default AuthTokenCreator;
