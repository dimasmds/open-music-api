import UseCaseDependencies from './definitions/UseCaseDependencies';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';
import UserRegister from '../../Domains/users/entities/UserRegister';

class UserCreationUseCase {
  private userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async execute(useCasePayload: any) {
    const userRegister = new UserRegister(this.passwordHash);
    const createdUserRegister = await userRegister.create(useCasePayload);

    const isUsernameAvailable = await this.userRepository
      .isRegisterUsernameAvailable(createdUserRegister.username);

    if (!isUsernameAvailable) {
      throw new Error('USER_CREATION_USE_CASE.USERNAME_ALREADY_TAKEN');
    }

    return this.userRepository.persist(createdUserRegister);
  }
}

export default UserCreationUseCase;
