import UserRepositoryPostgres from '../UserRepositoryPostgres';
import pool from '../../database/postgres/pool';
import UsersTableTestHelper from './_helper/UsersTableTestHelper';
import UserRegister from '../../../Domains/users/entities/UserRegister';
import PasswordHash from '../../../Domains/users/security/PasswordHash';
import UserRepository from '../../../Domains/users/repository/UserRepository';

describe('UserRepositoryPostgres', () => {
  const idGenerator = () => '123';
  const userRepositoryPostgres = new UserRepositoryPostgres({ pool, idGenerator });

  afterEach(async () => {
    await UsersTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('getPasswordByUsername', () => {
    it('should return null when password not found', async () => {
      // Action
      const password = await userRepositoryPostgres.getPasswordByUsername('dicoding');

      // Assert
      expect(password).toEqual(null);
    });

    it('should return password when founded', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dicoding', password: 'secret!' });

      // Action
      const password = await userRepositoryPostgres.getPasswordByUsername('dicoding');

      // Assert
      expect(password).toEqual('secret!');
    });
  });

  describe('getUserIdByUsername', () => {
    it('should return null when user id not found', async () => {
      // Action
      const userId = await userRepositoryPostgres.getUserIdByUsername('dicoding');

      // Assert
      expect(userId).toEqual(null);
    });

    it('should return user id when founded', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-abc', username: 'dicoding' });

      // Action
      const userId = await userRepositoryPostgres.getUserIdByUsername('dicoding');

      // Assert
      expect(userId).toEqual('user-abc');
    });
  });

  describe('isRegisterUsernameAvailable', () => {
    it('should return true if username not in database', async () => {
      // Action
      const result = await userRepositoryPostgres.isRegisterUsernameAvailable('dicoding');

      // Assert
      expect(result).toBe(true);
    });

    it('should return false if username is in database', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ username: 'dimasmds' });

      // Action
      const result = await userRepositoryPostgres.isRegisterUsernameAvailable('dimasmds');

      // Assert
      expect(result).toBe(false);
    });
  });

  describe('persist', () => {
    it('should persist user to database', async () => {
      // Arrange
      const registerUser = new UserRegister(<PasswordHash>{}, <UserRepository>{});
      registerUser.username = 'dimasmds';
      registerUser.password = 'secret!';
      registerUser.fullname = 'Dimas Maulana Dwi Saputra';

      // Action
      const userId = await userRepositoryPostgres.persist(registerUser);

      // Assert
      const users = await UsersTableTestHelper.findUsersByUsername('dimasmds');
      expect(users).toHaveLength(1);
      expect(userId).toEqual('user-123');
    });
  });
});
