import container from '../container';
import UserCreationUseCase from '../../../Applications/use_cases/users/UserCreationUseCase';
import LoginUseCase from '../../../Applications/use_cases/authentications/LoginUseCase';
import RefreshAuthenticationUseCase from '../../../Applications/use_cases/authentications/RefreshAuthenticationUseCase';
import LogoutUseCase from '../../../Applications/use_cases/authentications/LogoutUseCase';

describe('container', () => {
  describe('getting use case', () => {
    it('should return use case correctly', () => {
      const userCreationUseCase = container.getInstance(UserCreationUseCase.name);
      expect(userCreationUseCase).toBeInstanceOf(UserCreationUseCase);
      expect(userCreationUseCase.userRepository).toBeTruthy();
      expect(userCreationUseCase.passwordHash).toBeTruthy();

      const loginUseCase = container.getInstance(LoginUseCase.name);
      expect(loginUseCase).toBeInstanceOf(LoginUseCase);
      expect(loginUseCase.userRepository).toBeTruthy();
      expect(loginUseCase.authenticationRepository).toBeTruthy();
      expect(loginUseCase.passwordHash).toBeTruthy();
      expect(loginUseCase.authTokenCreator).toBeTruthy();

      const refreshAuthenticationUseCase = container.getInstance(RefreshAuthenticationUseCase.name);
      expect(refreshAuthenticationUseCase).toBeInstanceOf(RefreshAuthenticationUseCase);
      expect(refreshAuthenticationUseCase.authenticationRepository).toBeTruthy();
      expect(refreshAuthenticationUseCase.authTokenCreator).toBeTruthy();

      const logoutUseCase = container.getInstance(LogoutUseCase.name);
      expect(logoutUseCase).toBeInstanceOf(LogoutUseCase);
      expect(logoutUseCase.authenticationRepository).toBeTruthy();
    });
  });
});
