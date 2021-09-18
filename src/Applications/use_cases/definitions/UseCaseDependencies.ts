import UserRepository from '../../../Domains/users/UserRepository';
import PasswordHash from '../../security/PasswordHash';
import AuthenticationRepository from '../../../Domains/authentications/AuthenticationRepository';
import AuthTokenCreator from '../../security/AuthTokenCreator';

interface UseCaseDependencies {
  userRepository?: UserRepository
  authenticationRepository?: AuthenticationRepository
  passwordHash?: PasswordHash
  authTokenCreator?: AuthTokenCreator
}

export default UseCaseDependencies;
