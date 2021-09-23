import UserRepository from '../../../Domains/users/repository/UserRepository';
import PasswordHash from '../../../Domains/users/security/PasswordHash';
import AuthenticationRepository from '../../../Domains/authentications/repository/AuthenticationRepository';
import AuthTokenCreator from '../../../Domains/authentications/security/AuthTokenCreator';

interface UseCaseDependencies {
  userRepository?: UserRepository
  authenticationRepository?: AuthenticationRepository
  passwordHash?: PasswordHash
  authTokenCreator?: AuthTokenCreator
}

export default UseCaseDependencies;
