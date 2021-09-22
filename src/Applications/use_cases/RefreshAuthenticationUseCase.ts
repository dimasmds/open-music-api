import UseCaseDependencies from './definitions/UseCaseDependencies';
import AuthTokenCreator from '../../Domains/authentications/security/AuthTokenCreator';
import AuthenticationRepository from '../../Domains/authentications/repository/AuthenticationRepository';
import RefreshAuthentication from '../../Domains/authentications/entities/RefreshAuthentication';

class RefreshAuthenticationUseCase {
  private authTokenCreator: AuthTokenCreator;

  private authenticationRepository: AuthenticationRepository;

  constructor({ authTokenCreator, authenticationRepository }: UseCaseDependencies) {
    this.authTokenCreator = authTokenCreator;
    this.authenticationRepository = authenticationRepository;
  }

  async execute(payload: any) {
    const refreshAuthentication = new RefreshAuthentication(
      this.authenticationRepository, this.authTokenCreator,
    );
    const createdRefreshAuthentication = await refreshAuthentication.create(payload);
    return createdRefreshAuthentication.accessToken;
  }
}

export default RefreshAuthenticationUseCase;
