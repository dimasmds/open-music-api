import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import CollaborationCreationUseCase
  from '../../../../Applications/use_cases/collaborations/CollaborationCreationUseCase';
import CollaborationDeletionUseCase
  from '../../../../Applications/use_cases/collaborations/CollaborationDeletionUseCase';

class CollaborationsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this);
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this);
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

  async deleteCollaborationHandler(request: Request) {
    const { payload } = request;
    const { userId: ownerId } = request.auth.credentials;
    const useCase = this.container.getInstance(
      CollaborationDeletionUseCase.name,
    ) as CollaborationDeletionUseCase;

    await useCase.execute({ ...payload as object, ownerId });

    return {
      status: 'success',
      message: 'Collaboration deleted',
    };
  }
}

export default CollaborationsHandler;
