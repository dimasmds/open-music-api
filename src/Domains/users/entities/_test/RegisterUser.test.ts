import UserRegister from '../UserRegister';
import PasswordHash from '../../../../Applications/security/PasswordHash';

describe('UserRegister', () => {
  // Arrange
  const mockPasswordHash = <PasswordHash>{};
  mockPasswordHash.hash = jest.fn(() => Promise.resolve('hashed!'));
  const userRegister = new UserRegister(mockPasswordHash);

  describe('create', () => {
    it('should throw error when payload not contain username', async () => {
      // Action & Assert
      await expect(userRegister.create({})).rejects.toThrowError('USER_REGISTER.NOT_CONTAIN_USERNAME');
    });

    it('should throw error when username not string', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 123,
      })).rejects.toThrowError('USER_REGISTER.USERNAME_NOT_STRING');
    });

    it('should throw error when username more than 25 character', async () => {
      // Action & Assert
      await expect((userRegister.create({
        username: 'dicodingdicodingdicodingdicoding',
      }))).rejects.toThrowError('USER_REGISTER.USERNAME_MORE_THAN_25_CHAR');
    });

    it('should throw error when username contain restricted character', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 'dico ding',
      })).rejects.toThrowError('USER_REGISTER.USERNAME_CONTAIN_RESTRICT_CHARACTER');
    });

    it('should throw error when payload not contain password', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 'dicoding',
      })).rejects.toThrowError('USER_REGISTER.NOT_CONTAIN_PASSWORD');
    });

    it('should throw error when password not string', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 'dicoding',
        password: 123,
      })).rejects.toThrowError('USER_REGISTER.PASSWORD_NOT_STRING');
    });

    it('should throw error when payload not contain fullname', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 'dicoding',
        password: 'secret',
      })).rejects.toThrowError('USER_REGISTER.NOT_CONTAIN_FULLNAME');
    });

    it('should throw error when fullname not string', async () => {
      // Action & Assert
      await expect(userRegister.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 123,
      })).rejects.toThrowError('USER_REGISTER.FULLNAME_NOT_STRING');
    });

    it('should contain username property', async () => {
      // Action
      const createdUserRegister = await userRegister.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(createdUserRegister.username).toEqual('dicoding');
    });

    it('should contain password property with hashed password', async () => {
      // Action
      const createdUserRegister = await userRegister.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(mockPasswordHash.hash).toBeCalledWith('secret');
      expect(createdUserRegister.password).toEqual('hashed!');
    });

    it('should contain fullname property', async () => {
      // Action
      const createdUserRegister = await userRegister.create({
        username: 'dicoding',
        password: 'secret',
        fullname: 'Dimas Maulana',
      });

      // Assert
      expect(createdUserRegister.fullname).toEqual('Dimas Maulana');
    });
  });
});
