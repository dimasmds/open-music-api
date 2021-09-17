/* eslint-disable no-unused-vars */
import RegisterUser from './entities/RegisterUser';

interface UserRepository {
  persist(registerUser: RegisterUser): Promise<string>
  isRegisterUsernameAvailable(username: string) : Promise<boolean>
}

export default UserRepository;
