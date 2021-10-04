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
    'SONG_CREATION.ALBUM_NOT_VALID': new InvariantError('album is invalid'),
    'SONG_CREATION.PAYLOAD_NOT_CONTAIN_TITLE': new InvariantError('new song should contain title'),
    'SONG_CREATION.TITLE_NOT_STRING': new InvariantError('new song title should be string'),
    'SONG_CREATION.PAYLOAD_NOT_CONTAIN_YEAR': new InvariantError('new song should contain year'),
    'SONG_CREATION.YEAR_NOT_NUMBER': new InvariantError('new song year should a number'),
    'SONG_CREATION.YEAR_SHOULD_NOT_DECIMAL': new InvariantError('new song year should not decimal'),
    'SONG_CREATION.PAYLOAD_NOT_CONTAIN_GENRE': new InvariantError('new song should contain genre'),
    'SONG_CREATION.GENRE_NOT_STRING': new InvariantError('new song genre should be string'),
    'SONG_CREATION.PAYLOAD_NOT_CONTAIN_PERFORMER': new InvariantError('new song should contain performer'),
    'SONG_CREATION.PERFORMER_NOT_STRING': new InvariantError('new song performer should be string'),
    'SONG_CREATION.DURATION_NOT_STRING': new InvariantError('new song duration should be string'),
    'SONG_CREATION.ALBUM_ID_NOT_STRING': new InvariantError('new song album id should be string'),
    'SONG_UPDATE.ID_NOT_VALID': new NotFoundError('no song found'),
    'SONG_UPDATE.ALBUM_NOT_VALID': new InvariantError('album id is not valid'),
    'SONG_UPDATE.PAYLOAD_NOT_CONTAIN_TITLE': new InvariantError('update song should contain title'),
    'SONG_UPDATE.TITLE_NOT_STRING': new InvariantError('update song title should string'),
    'SONG_UPDATE.PAYLOAD_NOT_CONTAIN_YEAR': new InvariantError('update song should contain year'),
    'SONG_UPDATE.YEAR_NOT_NUMBER': new InvariantError('update song year should number'),
    'SONG_UPDATE.YEAR_SHOULD_NOT_DECIMAL': new InvariantError('update song year should not decimal'),
    'SONG_UPDATE.PAYLOAD_NOT_CONTAIN_GENRE': new InvariantError('update song should contain genre'),
    'SONG_UPDATE.GENRE_NOT_STRING': new InvariantError('update song genre should be string'),
    'SONG_UPDATE.PAYLOAD_NOT_CONTAIN_PERFORMER': new InvariantError('update song should contain performer'),
    'SONG_UPDATE.PERFORMER_NOT_STRING': new InvariantError('update song performer should be string'),
    'SONG_UPDATE.PAYLOAD_NOT_CONTAIN_ID': new InvariantError('update song should contain id'),
    'SONG_UPDATE.ID_NOT_STRING': new InvariantError('update song id should be string'),
    'SONG_UPDATE.DURATION_NOT_NUMBER': new InvariantError('update song duration should be number'),
    'SONG_UPDATE.ALBUM_ID_NOT_STRING': new InvariantError('update song album id should be string'),
    'DELETE_SONG.SONG_NOT_VALID': new NotFoundError('no song found'),
    'DELETE_SONG.ID_NOT_DEFINED': new InvariantError('delete song should contain id'),
    'DELETE_SONG.ID_NOT_STRING': new InvariantError('delete song id should be string'),
    'GET_DETAIL_SONG.SONG_NOT_FOUND': new NotFoundError('no song found'),
    'GET_DETAIL_SONG.ID_NOT_DEFINED': new InvariantError('get detail song should contain id'),
    'GET_DETAIL_SONG.ID_NOT_STRING': new InvariantError('get detail song id should be a string'),

  }

  static translate(domainError: Error): Error {
    return this.Directories[domainError.message] || domainError;
  }
}

export default DomainToHttpErrorTranslator;
