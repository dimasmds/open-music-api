import AuthTokenCreator from '../../../Applications/security/AuthTokenCreator';

class Authentication {
  private authTokenCreator: AuthTokenCreator;

  public accessToken: string;

  public refreshToken: string;

  constructor(authTokenCreator: AuthTokenCreator) {
    this.authTokenCreator = authTokenCreator;
  }

  async create(payload: any) {
    Authentication.verifyPayload(payload);
    const { userId } = payload;

    const accessToken = await this.authTokenCreator.createAccessToken({ userId });
    const refreshToken = await this.authTokenCreator.createRefreshToken({ userId });

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;

    return this;
  }

  private static verifyPayload(payload: any) {
    const { userId } = payload;

    if (!userId) {
      throw new Error('AUTHENTICATION.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('AUTHENTICATION.USER_ID_NOT_STRING');
    }
  }
}

export default Authentication;
