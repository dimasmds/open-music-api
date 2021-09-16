import RegisterUser from '../RegisterUser';
import PasswordHash from '../../../../Applications/security/PasswordHash';

describe('RegisterUser', () => {
  // Arrange
  const mockPasswordHash = <PasswordHash>{};
  mockPasswordHash.hash = jest.fn(() => Promise.resolve('hashed!'));
  const registerUser = new RegisterUser(mockPasswordHash);

  describe('create', () => {
    it('should throw error when payload not contain username', async () => {
      // Action & Assert
      await expect(registerUser.create({})).rejects.toThrowError('REGISTER_USER.NOT_CONTAIN_USERNAME');
    });

    it('should throw error when username not string', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 123,
      })).rejects.toThrowError('REGISTER_USER.USERNAME_NOT_STRING');
    });

    it('should throw error when username more than 25 character', async () => {
      // Action & Assert
      await expect((registerUser.create({
        username: 'dicodingdicodingdicodingdicoding',
      }))).rejects.toThrowError('REGISTER_USER.USERNAME_MORE_THAN_25_CHAR');
    });

    it('should throw error when username contain restricted character', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 'dico ding',
      })).rejects.toThrowError('REGISTER_USER.USERNAME_CONTAIN_RESTRICT_CHARACTER');
    });

    it('should throw error when payload not contain password', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 'dicoding',
      })).rejects.toThrowError('REGISTER_USER.NOT_CONTAIN_PASSWORD');
    });

    it('should throw error when password not string', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 'dicoding',
        password: 123,
      })).rejects.toThrowError('REGISTER_USER.PASSWORD_NOT_STRING');
    });

    it('should throw error when payload not contain fullname', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 'dicoding',
        password: 'secret',
      })).rejects.toThrowError('REGISTER_USER.NOT_CONTAIN_FULLNAME');
    });

    it('should throw error when fullname not string', async () => {
      // Action & Assert
      await expect(registerUser.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 123,
      })).rejects.toThrowError('REGISTER_USER.FULLNAME_NOT_STRING');
    });

    it('should contain username property', async () => {
      // Action
      const createdRegisterUser = await registerUser.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(createdRegisterUser.username).toEqual('dicoding');
    });

    it('should contain password property with hashed password', async () => {
      // Action
      const createdRegisterUser = await registerUser.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(mockPasswordHash.hash).toBeCalledWith('secret');
      expect(createdRegisterUser.password).toEqual('hashed!');
    });

    it('should contain fullname property', async () => {
      // Action
      const createdRegisterUser = await registerUser.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(createdRegisterUser.fullname).toEqual('Dimas Maulana');
    });
  });
});
