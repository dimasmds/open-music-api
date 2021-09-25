import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import LoginUseCase from '../../../../Applications/use_cases/authentications/LoginUseCase';
import RefreshAuthenticationUseCase
  from '../../../../Applications/use_cases/authentications/RefreshAuthenticationUseCase';
import LogoutUseCase from '../../../../Applications/use_cases/authentications/LogoutUseCase';

class AuthenticationHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request: Request, h: ResponseToolkit) {
    const loginUseCase = <LoginUseCase> this.container.getInstance(LoginUseCase.name);
    const { accessToken, refreshToken } = await loginUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
      },
    });
    response.code(201);
    return response;
  }

  async putAuthenticationHandler(request: Request) {
    const refreshAuthenticationUseCase = <RefreshAuthenticationUseCase>
      this.container.getInstance(RefreshAuthenticationUseCase.name);
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);

    return {
      status: 'success',
      data: {
        accessToken,
      },
    };
  }

  async deleteAuthenticationHandler(request: Request) {
    const logoutUseCase = <LogoutUseCase> this.container.getInstance(LogoutUseCase.name);
    await logoutUseCase.execute(request.payload);

    return {
      status: 'success',
      message: 'you have logged out',
    };
  }
}

export default AuthenticationHandler;
