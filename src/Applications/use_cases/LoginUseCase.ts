import UseCaseDependencies from './definitions/UseCaseDependencies';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';
import AuthTokenCreator from '../security/AuthTokenCreator';
import AuthenticationRepository from '../../Domains/authentications/AuthenticationRepository';
import UserLogin from '../../Domains/users/entities/UserLogin';
import Authentication from '../../Domains/authentications/entities/Authentication';

class LoginUseCase {
  private readonly userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  private readonly authTokenCreator: AuthTokenCreator;

  private authenticationRepository: AuthenticationRepository;

  constructor({
    userRepository, passwordHash, authTokenCreator, authenticationRepository,
  }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
    this.authTokenCreator = authTokenCreator;
    this.authenticationRepository = authenticationRepository;
  }

  async execute(useCasePayload: any) {
    const userLogin = new UserLogin(this.passwordHash, this.userRepository);
    const createdUserLogin = await userLogin.create(useCasePayload);

    const authentication = new Authentication(this.authTokenCreator);
    const createdAuthentication = await authentication.create(createdUserLogin);

    await this.authenticationRepository.persistRefreshToken(createdAuthentication.refreshToken);

    return createdAuthentication;
  }
}

export default LoginUseCase;
