import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import PlaylistCreationUseCase
  from '../../../../Applications/use_cases/playlists/PlaylistCreationUseCase';
import GetPlaylistsUseCase from '../../../../Applications/use_cases/playlists/GetPlaylistsUseCase';

class PlaylistsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    // bind
    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
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

  async getPlaylistsHandler(request: Request) {
    const useCase = this.container.getInstance(
      GetPlaylistsUseCase.name,
    ) as GetPlaylistsUseCase;

    const { userId } = request.auth.credentials;

    const playlists = await useCase.execute({ userId });

    return {
      status: 'success',
      data: {
        playlists,
      },
    };
  }
}

export default PlaylistsHandler;
