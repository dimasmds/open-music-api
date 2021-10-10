/* eslint-disable no-unused-vars */
import UserRegister from '../entities/UserRegister';

interface UserRepository {
  persist(registerUser: UserRegister): Promise<string>
  isRegisterUsernameAvailable(username: string) : Promise<boolean>
  getPasswordByUsername(username: string) : Promise<string | null>
  getUserIdByUsername(username: string) : Promise<string | null>
  isUserIdValid(userId: string) : Promise<boolean>
}

export default UserRepository;
