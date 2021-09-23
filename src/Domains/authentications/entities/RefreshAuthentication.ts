import AuthenticationRepository from '../repository/AuthenticationRepository';
import AuthTokenCreator from '../security/AuthTokenCreator';

class RefreshAuthentication {
  private authenticationRepository: AuthenticationRepository;

  private authTokenCreator: AuthTokenCreator;

  public accessToken: string;

  constructor(
    authenticationRepository: AuthenticationRepository,
    authTokenCreator: AuthTokenCreator,
  ) {
    this.authenticationRepository = authenticationRepository;
    this.authTokenCreator = authTokenCreator;
  }

  async create(payload: any) {
    RefreshAuthentication.verifyPayload(payload);

    const { refreshToken } = payload;

    const isSignatureValid = await this.authTokenCreator.isSignatureValid(refreshToken);

    if (!isSignatureValid) {
      throw new Error('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_HAVE_VALID_SIGNATURE');
    }

    const isRegistered = await this.authenticationRepository.isRefreshTokenRegistered(refreshToken);

    if (!isRegistered) {
      throw new Error('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_REGISTERED');
    }

    const { userId } = await this.authTokenCreator.getObjectPayload(refreshToken);
    this.accessToken = await this.authTokenCreator.createAccessToken({ userId });

    return this;
  }

  private static verifyPayload(payload: any) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('REFRESH_AUTHENTICATION.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_STRING');
    }
  }
}

export default RefreshAuthentication;
