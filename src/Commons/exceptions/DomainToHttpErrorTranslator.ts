import AuthenticationError from './AuthenticationError';
import InvariantError from './InvariantError';

class DomainToHttpErrorTranslator {
  static Directories: any = {
    'USER_LOGIN.USERNAME_NOT_FOUND': new AuthenticationError('user is not found'),
    'USER_LOGIN.PASSWORD_NOT_MATCH': new AuthenticationError('password is not match'),
    'USER_LOGIN.NOT_CONTAIN_USERNAME': new InvariantError('not contain username'),
    'USER_LOGIN.USERNAME_NOT_STRING': new InvariantError('username should be string'),
    'USER_LOGIN.NOT_CONTAIN_PASSWORD': new InvariantError('not contain password'),
    'USER_LOGIN.PASSWORD_NOT_STRING': new InvariantError('password should be string'),
    'USER_REGISTER.USERNAME_ALREADY_TAKEN': new InvariantError('username already taken'),
    'USER_REGISTER.NOT_CONTAIN_USERNAME': new InvariantError('not contain username'),
    'USER_REGISTER.USERNAME_NOT_STRING': new InvariantError('username is not string'),
    'USER_REGISTER.USERNAME_MORE_THAN_25_CHAR': new InvariantError('username not allow to more than 25 char'),
    'USER_REGISTER.USERNAME_CONTAIN_RESTRICT_CHARACTER': new InvariantError('username contain restrict character'),
    'USER_REGISTER.NOT_CONTAIN_PASSWORD': new InvariantError('not contain password'),
    'USER_REGISTER.PASSWORD_NOT_STRING': new InvariantError('password should be string'),
    'USER_REGISTER.NOT_CONTAIN_FULLNAME': new InvariantError('not contain fullname'),
    'USER_REGISTER.FULLNAME_NOT_STRING': new InvariantError('full name should be string'),
    'REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_HAVE_VALID_SIGNATURE': new InvariantError('refresh token not valid'),
    'REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_REGISTERED': new InvariantError('refresh token not registered'),
    'REFRESH_AUTHENTICATION.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('should contain refresh token'),
    'REFRESH_AUTHENTICATION.REFRESH_TOKEN_NOT_STRING': new InvariantError('refresh token should be string'),
    'LOGOUT.REFRESH_TOKEN_NOT_REGISTERED_IN_DATABASE': new InvariantError('refresh token not registered'),
    'LOGOUT.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('should contain refresh token'),
    'LOGOUT.REFRESH_TOKEN_NOT_STRING': new InvariantError('refresh token should be string'),
  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
