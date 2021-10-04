import AuthenticationError from './AuthenticationError';
import InvariantError from './InvariantError';
import NotFoundError from './NotFoundError';

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
    'ALBUM_CREATION.NOT_CONTAIN_NAME': new InvariantError('new album should contain name'),
    'ALBUM_CREATION.NAME_NOT_STRING': new InvariantError('new album name should be string'),
    'ALBUM_CREATION.NOT_CONTAIN_YEAR': new InvariantError('new album should contain year'),
    'ALBUM_CREATION.YEAR_NOT_NUMBER': new InvariantError('new album year should be number'),
    'ALBUM_CREATION.YEAR_CANNOT_DECIMAL': new InvariantError('new album year should not be decimal'),
    'ALBUM_UPDATE.ID_NOT_VALID': new NotFoundError('no album found'),
    'ALBUM_UPDATE.NOT_CONTAIN_ID': new InvariantError('update album should contain id'),
    'ALBUM_UPDATE.ID_NOT_STRING': new InvariantError('update album id should be string'),
    'ALBUM_UPDATE.NOT_CONTAIN_NAME': new InvariantError('update album should contain name'),
    'ALBUM_UPDATE.NAME_NOT_STRING': new InvariantError('update album name should be string'),
    'ALBUM_UPDATE.NOT_CONTAIN_YEAR': new InvariantError('update album should contain year'),
    'ALBUM_UPDATE.YEAR_NOT_NUMBER': new InvariantError('update album year should be number'),
    'ALBUM_UPDATE.SHOULD_NOT_DECIMAL': new InvariantError('update album year should not decimal'),
    'DELETE_ALBUM.ID_NOT_VALID': new NotFoundError('no album found'),
    'DELETE_ALBUM.ID_NOT_DEFINED': new InvariantError('delete album should contain album id'),
    'DELETE_ALBUM.ID_NOT_STRING': new InvariantError('delete album id should be string'),
    'GET_ALBUM.ALBUM_NOT_FOUND': new NotFoundError('no album found'),
    'GET_ALBUM.NOT_CONTAIN_ID': new InvariantError('get album should contain id'),
    'GET_ALBUM.ID_NOT_STRING': new InvariantError('get album id should string'),

  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
