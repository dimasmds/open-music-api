import PasswordHash from '../../../Applications/security/PasswordHash';
import UserRepository from '../UserRepository';

class UserLogin {
  private passwordHash: PasswordHash;

  private userRepository: UserRepository;

  public userId: string;

  constructor(passwordHash: PasswordHash, userRepository: UserRepository) {
    this.passwordHash = passwordHash;
    this.userRepository = userRepository;
  }

  async create(payload: any) {
    UserLogin.verifyPayload(payload);

    const { username, password } = payload;

    const hashedPassword = await this.userRepository.getPasswordByUsername(username);

    if (hashedPassword === null) {
      throw new Error('USER_LOGIN.USERNAME_NOT_FOUND');
    }

    const isPasswordMatch = await this.passwordHash.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      throw new Error('USER_LOGIN.PASSWORD_NOT_MATCH');
    }

    const userId = await this.userRepository.getUserIdByUsername(username);

    if (userId === null) {
      throw new Error('USER_LOGIN.USER_ID_NOT_FOUND');
    }

    this.userId = userId;
    return this;
  }

  private static verifyPayload(payload: any) {
    const { username, password } = payload;

    if (!username) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_USERNAME');
    }

    if (typeof username !== 'string') {
      throw new Error('USER_LOGIN.USERNAME_NOT_STRING');
    }

    if (!password) {
      throw new Error('USER_LOGIN.NOT_CONTAIN_PASSWORD');
    }

    if (typeof password !== 'string') {
      throw new Error('USER_LOGIN.PASSWORD_NOT_STRING');
    }
  }
}

export default UserLogin;
