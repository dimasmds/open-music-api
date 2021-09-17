/* eslint-disable no-unused-vars */
import RegisterUser from './entities/RegisterUser';

interface UserRepository {
  persist(registerUser: RegisterUser): Promise<string>
}

export default UserRepository;
