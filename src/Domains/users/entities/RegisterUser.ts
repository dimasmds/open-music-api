import PasswordHash from '../../../Applications/security/PasswordHash';

class RegisterUser {
  private passwordHash: PasswordHash;

  public username: string;

  public password: string;

  public fullname: string;

  constructor(passwordHash: PasswordHash) {
    this.passwordHash = passwordHash;
  }

  async create(payload: any) {
    RegisterUser.verifyCreationPayload(payload);

    const { username, password, fullname } = payload;

    this.username = username;
    this.password = await this.passwordHash.hash(password);
    this.fullname = fullname;

    return this;
  }

  private static verifyCreationPayload(payload: any) {
    const { username, password, fullname } = payload;

    if (!username) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_USERNAME');
    }

    if (typeof username !== 'string') {
      throw new Error('REGISTER_USER.USERNAME_NOT_STRING');
    }

    if (username.length > 25) {
      throw new Error('REGISTER_USER.USERNAME_MORE_THAN_25_CHAR');
    }

    if (!username.match(/^[\w]+$/)) {
      throw new Error('REGISTER_USER.USERNAME_CONTAIN_RESTRICT_CHARACTER');
    }

    if (!password) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_PASSWORD');
    }

    if (typeof password !== 'string') {
      throw new Error('REGISTER_USER.PASSWORD_NOT_STRING');
    }

    if (!fullname) {
      throw new Error('REGISTER_USER.NOT_CONTAIN_FULLNAME');
    }

    if (typeof fullname !== 'string') {
      throw new Error('REGISTER_USER.FULLNAME_NOT_STRING');
    }
  }
}

export default RegisterUser;
