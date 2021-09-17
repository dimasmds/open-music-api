import UserRepository from '../../../Domains/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';

interface UseCaseDependencies {
  userRepository?: UserRepository
  passwordHash?: PasswordHash
}

export default UseCaseDependencies;
