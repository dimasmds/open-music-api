import UseCaseDependencies from './definitions/UseCaseDependencies';
import AuthenticationRepository from '../../Domains/authentications/repository/AuthenticationRepository';

class LogoutUseCase {
  private authenticationRepository: AuthenticationRepository;

  constructor({ authenticationRepository } : UseCaseDependencies) {
    this.authenticationRepository = authenticationRepository;
  }

  async execute(payload: any) {
    LogoutUseCase.verifyPayload(payload);
    const { authenticationRepository } = this;

    const { refreshToken } = payload;

    const isTokenRegistered = await authenticationRepository.isRefreshTokenRegistered(refreshToken);
    if (!isTokenRegistered) {
      throw new Error('LOGOUT.REFRESH_TOKEN_NOT_REGISTERED_IN_DATABASE');
    }

    await authenticationRepository.deleteRefreshToken(refreshToken);
  }

  private static verifyPayload(payload: any) {
    const { refreshToken } = payload;

    if (!refreshToken) {
      throw new Error('LOGOUT.NOT_CONTAIN_REFRESH_TOKEN');
    }

    if (typeof refreshToken !== 'string') {
      throw new Error('LOGOUT.REFRESH_TOKEN_NOT_STRING');
    }
  }
}

export default LogoutUseCase;
