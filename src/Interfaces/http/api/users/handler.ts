import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import UserCreationUseCase from '../../../../Applications/use_cases/users/UserCreationUseCase';

class UserHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postUserHandler = this.postUserHandler.bind(this);
  }

  async postUserHandler(request: Request, h: ResponseToolkit) {
    const userCreationUseCase = <UserCreationUseCase> this.container
      .getInstance(UserCreationUseCase.name);

    const userId = await userCreationUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        userId,
      },
    });

    response.code(201);
    return response;
  }
}

export default UserHandler;
