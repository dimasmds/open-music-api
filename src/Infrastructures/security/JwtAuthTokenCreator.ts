import Jwt from '@hapi/jwt';
import AuthTokenCreator from '../../Domains/authentications/security/AuthTokenCreator';
import config from '../../Commons/config';

class JwtAuthTokenCreator implements AuthTokenCreator {
  createAccessToken(payload: any): Promise<string> {
    return new Promise<string>((resolve) => {
      const accessToken = Jwt.token.generate(payload, config.security.accessTokenSecret);
      return resolve(accessToken);
    });
  }

  createRefreshToken(payload: any): Promise<string> {
    return new Promise<string>((resolve) => {
      const refreshToken = Jwt.token.generate(payload, config.security.refreshTokenSecret);
      return resolve(refreshToken);
    });
  }

  getObjectPayload(token: string): Promise<any> {
    return new Promise<any>((resolve) => {
      const { decoded: { payload } } = Jwt.token.decode(token);
      return resolve(payload);
    });
  }

  isRefreshTokenSignatureValid(token: string): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      try {
        const artifacts = Jwt.token.decode(token);
        Jwt.token.verifySignature(artifacts, config.security.refreshTokenSecret);
        return resolve(true);
      } catch {
        return resolve(false);
      }
    });
  }
}

export default JwtAuthTokenCreator;
