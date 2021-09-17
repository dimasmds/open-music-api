import UseCaseDependencies from './definitions/UseCaseDependencies';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';
import RegisterUser from '../../Domains/users/entities/RegisterUser';

class UserCreationUseCase {
  private userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async execute(useCasePayload: any) {
    const registerUser = new RegisterUser(this.passwordHash);
    const createdRegisterUser = await registerUser.create(useCasePayload);

    const isUsernameAvailable = await this.userRepository
      .isRegisterUsernameAvailable(createdRegisterUser.username);

    if (!isUsernameAvailable) {
      throw new Error('USER_CREATION_USE_CASE.USERNAME_ALREADY_TAKEN');
    }

    return this.userRepository.persist(createdRegisterUser);
  }
}

export default UserCreationUseCase;
