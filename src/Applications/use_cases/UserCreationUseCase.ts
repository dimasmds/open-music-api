import UseCaseDependencies from './definitions/UseCaseDependencies';
import UserRepository from '../../Domains/users/UserRepository';
import PasswordHash from '../security/PasswordHash';
import UserRegister from '../../Domains/users/entities/UserRegister';

class UserCreationUseCase {
  private readonly userRepository: UserRepository;

  private readonly passwordHash: PasswordHash;

  constructor({ userRepository, passwordHash }: UseCaseDependencies) {
    this.userRepository = userRepository;
    this.passwordHash = passwordHash;
  }

  async execute(useCasePayload: any) {
    const userRegister = new UserRegister(this.passwordHash, this.userRepository);
    const createdUserRegister = await userRegister.create(useCasePayload);

    return this.userRepository.persist(createdUserRegister);
  }
}

export default UserCreationUseCase;
