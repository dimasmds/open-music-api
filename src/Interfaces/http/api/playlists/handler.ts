import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import PlaylistCreationUseCase
  from '../../../../Applications/use_cases/playlists/PlaylistCreationUseCase';
import GetPlaylistsUseCase from '../../../../Applications/use_cases/playlists/GetPlaylistsUseCase';
import DeletePlaylistUseCase
  from '../../../../Applications/use_cases/playlists/DeletePlaylistUseCase';
import AddSongToPlaylistUseCase
  from '../../../../Applications/use_cases/playlists/AddSongToPlaylistUseCase';
import GetDetailPlaylistUseCase
  from '../../../../Applications/use_cases/playlists/GetDetailPlaylistUseCase';
import DeleteSongInPlaylistUseCase
  from '../../../../Applications/use_cases/playlists/DeleteSongInPlaylistUseCase';
import GetPlaylistActivitiesUseCase
  from '../../../../Applications/use_cases/playlists/GetPlaylistActivitiesUseCase';
import ExportPlaylistUseCase
  from '../../../../Applications/use_cases/playlists/ExportPlaylistUseCase';

class PlaylistsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    // bind
    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this);
    this.deletePlaylistByIdHandler = this.deletePlaylistByIdHandler.bind(this);
    this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
    this.getPlaylistSongsHandler = this.getPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongHandler = this.deletePlaylistSongHandler.bind(this);
    this.getPlaylistActivitiesHandler = this.getPlaylistActivitiesHandler.bind(this);
    this.exportPlaylistByIdHandler = this.exportPlaylistByIdHandler.bind(this);
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

  async deletePlaylistByIdHandler(request: Request) {
    const useCase = this.container.getInstance(
      DeletePlaylistUseCase.name,
    ) as DeletePlaylistUseCase;

    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;

    await useCase.execute({ playlistId, userId });

    return {
      status: 'success',
      message: 'Playlist deleted',
    };
  }

  async postPlaylistSongsHandler(request: Request, h: ResponseToolkit) {
    const useCase = this.container.getInstance(
      AddSongToPlaylistUseCase.name,
    ) as AddSongToPlaylistUseCase;

    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;
    const { payload } = request;

    await useCase.execute({ playlistId, userId, ...payload as object });

    const response = h.response({
      status: 'success',
      message: 'Song added to playlist',
    });
    response.code(201);
    return response;
  }

  async getPlaylistSongsHandler(request: Request) {
    const useCase = this.container.getInstance(
      GetDetailPlaylistUseCase.name,
    ) as GetDetailPlaylistUseCase;

    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;

    const playlist = await useCase.execute({ playlistId, userId });

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deletePlaylistSongHandler(request: Request) {
    const useCase = this.container.getInstance(
      DeleteSongInPlaylistUseCase.name,
    ) as DeleteSongInPlaylistUseCase;

    const { id: playlistId } = request.params;
    const { userId } = request.auth.credentials;
    const { payload } = request;

    await useCase.execute({ playlistId, userId, ...payload as object });

    return {
      status: 'success',
      message: 'Song removed from playlist',
    };
  }

  async getPlaylistActivitiesHandler(request: Request) {
    const { userId } = request.auth.credentials as { userId: string};
    const { id: playlistId } = request.params;

    const useCase = this.container.getInstance(
      GetPlaylistActivitiesUseCase.name,
    ) as GetPlaylistActivitiesUseCase;

    const activities = await useCase.execute({ playlistId, userId });

    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }

  async exportPlaylistByIdHandler(request: Request, h: ResponseToolkit) {
    const { playlistId } = request.params;
    const { userId } = request.auth.credentials;
    const { payload } = request;

    const useCase = this.container.getInstance(
      ExportPlaylistUseCase.name,
    ) as ExportPlaylistUseCase;

    await useCase.execute({ playlistId, userId, ...payload as object });

    const response = h.response({
      status: 'success',
      message: 'Playlist exported',
    });
    response.code(201);
    return response;
  }
}

export default PlaylistsHandler;
