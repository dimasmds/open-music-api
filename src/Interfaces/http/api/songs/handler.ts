import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import SongCreationUseCase from '../../../../Applications/use_cases/songs/SongCreationUseCase';
import GetSongsUseCase from '../../../../Applications/use_cases/songs/GetSongsUseCase';
import GetDetailSongUseCase from '../../../../Applications/use_cases/songs/GetDetailSongUseCase';
import UpdateSongUseCase from '../../../../Applications/use_cases/songs/UpdateSongUseCase';
import DeleteSongUseCase from '../../../../Applications/use_cases/songs/DeleteSongUseCase';

class SongsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postSongsHandler = this.postSongsHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongsHandler(request: Request, h: ResponseToolkit) {
    const songCreationUseCase = <SongCreationUseCase> this.container
      .getInstance(SongCreationUseCase.name);

    const songId = await songCreationUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        songId,
      },
    });

    response.code(201);
    return response;
  }

  async getSongsHandler(request: Request) {
    const getSongsUseCase = <GetSongsUseCase> this.container.getInstance(GetSongsUseCase.name);

    const { title, performer } = request.query;

    const songs = await getSongsUseCase.execute({ title, performer });

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request: Request) {
    const { id } = request.params;

    const getDetailSongUseCase = <GetDetailSongUseCase> this.container
      .getInstance(GetDetailSongUseCase.name);

    const song = await getDetailSongUseCase.execute({ id });

    return {
      status: 'success',
      data: {
        song,
      },
    };
  }

  async putSongByIdHandler(request: Request) {
    const { id } = request.params;

    const updateSongUseCase = <UpdateSongUseCase> this.container
      .getInstance(UpdateSongUseCase.name);

    await updateSongUseCase.execute({ id, ...request.payload as object });

    return {
      status: 'success',
      message: 'song updated',
    };
  }

  async deleteSongByIdHandler(request: Request) {
    const { id } = request.params;

    const deleteSongUseCase = <DeleteSongUseCase> this.container
      .getInstance(DeleteSongUseCase.name);

    await deleteSongUseCase.execute({ id });

    return {
      status: 'success',
      message: 'song deleted',
    };
  }
}

export default SongsHandler;
