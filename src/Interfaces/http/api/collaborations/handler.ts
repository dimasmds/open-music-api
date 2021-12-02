import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import CollaborationCreationUseCase
  from '../../../../Applications/use_cases/collaborations/CollaborationCreationUseCase';

class CollaborationsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
  }

  async postCollaborationHandler(request: Request, h: ResponseToolkit) {
    const { payload } = request;
    const { userId: ownerId } = request.auth.credentials;
    const useCase = this.container.getInstance(
      CollaborationCreationUseCase.name,
    ) as CollaborationCreationUseCase;

    const collaborationId = await useCase.execute({ ...payload as object, ownerId });

    const response = h.response({
      status: 'success',
      data: {
        collaborationId,
      },
    });
    response.code(201);
    return response;
  }
}

export default CollaborationsHandler;
