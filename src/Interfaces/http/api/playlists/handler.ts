import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import PlaylistCreationUseCase
  from '../../../../Applications/use_cases/playlists/PlaylistCreationUseCase';

class PlaylistsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    // bind
    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request: Request, h: ResponseToolkit) {
    const useCase = this.container.getInstance(
      PlaylistCreationUseCase.name,
    ) as PlaylistCreationUseCase;

    const { payload } = request;
    const { userId } = request.auth.credentials;

    const playlistId = await useCase.execute({ ...payload as object, userId });

    const response = h.response({
      status: 'success',
      data: {
        playlistId,
      },
    });
    response.code(201);
    return response;
  }
}

export default PlaylistsHandler;
