import PasswordHash from '../security/PasswordHash';
import UserRepository from '../repository/UserRepository';

class UserRegister {
  private passwordHash: PasswordHash;

  private userRepository: UserRepository;

  public username: string;

  public password: string;

  public fullname: string;

  constructor(passwordHash: PasswordHash, userRepository: UserRepository) {
    this.passwordHash = passwordHash;
    this.userRepository = userRepository;
  }

  async create(payload: any) {
    UserRegister.verifyCreationPayload(payload);

    const { username, password, fullname } = payload;

    const isRegisterUsernameAvailable = await this.userRepository
      .isRegisterUsernameAvailable(username);

    if (!isRegisterUsernameAvailable) {
      throw new Error('USER_REGISTER.USERNAME_ALREADY_TAKEN');
    }

    this.username = username;
    this.password = await this.passwordHash.hash(password);
    this.fullname = fullname;

    return this;
  }

  private static verifyCreationPayload(payload: any) {
    const { username, password, fullname } = payload;

    if (!username) {
      throw new Error('USER_REGISTER.NOT_CONTAIN_USERNAME');
    }

    if (typeof username !== 'string') {
      throw new Error('USER_REGISTER.USERNAME_NOT_STRING');
    }

    if (username.length > 25) {
      throw new Error('USER_REGISTER.USERNAME_MORE_THAN_25_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('USER_REGISTER.USERNAME_CONTAIN_RESTRICT_CHARACTER');
    }

    if (!password) {
      throw new Error('USER_REGISTER.NOT_CONTAIN_PASSWORD');
    }

    if (typeof password !== 'string') {
      throw new Error('USER_REGISTER.PASSWORD_NOT_STRING');
    }

    if (!fullname) {
      throw new Error('USER_REGISTER.NOT_CONTAIN_FULLNAME');
    }

    if (typeof fullname !== 'string') {
      throw new Error('USER_REGISTER.FULLNAME_NOT_STRING');
    }
  }
}

export default UserRegister;
