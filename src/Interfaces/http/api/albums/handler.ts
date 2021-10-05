import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import AlbumCreationUseCase from '../../../../Applications/use_cases/albums/AlbumCreationUseCase';
import GetAlbumDetailUseCase from '../../../../Applications/use_cases/albums/GetAlbumDetailUseCase';
import UpdateAlbumUseCase from '../../../../Applications/use_cases/albums/UpdateAlbumUseCase';
import DeleteAlbumUseCase from '../../../../Applications/use_cases/albums/DeleteAlbumUseCase';

class AlbumsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request: Request, h: ResponseToolkit) {
    const albumCreationUseCase = <AlbumCreationUseCase> this.container
      .getInstance(AlbumCreationUseCase.name);

    const albumId = await albumCreationUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request: Request) {
    const getAlbumDetailUseCase = <GetAlbumDetailUseCase> this.container
      .getInstance(GetAlbumDetailUseCase.name);

    const { id } = request.params;

    const album = await getAlbumDetailUseCase.execute({ id });

    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request: Request) {
    const updateAlbumUseCase = <UpdateAlbumUseCase> this.container
      .getInstance(UpdateAlbumUseCase.name);

    const { id } = request.params;

    await updateAlbumUseCase.execute({ id, ...request.payload as object });

    return {
      status: 'success',
      message: 'album update success',
    };
  }

  async deleteAlbumByIdHandler(request: Request) {
    const deleteAlbumUseCase = <DeleteAlbumUseCase> this.container
      .getInstance(DeleteAlbumUseCase.name);

    const { id } = request.params;

    await deleteAlbumUseCase.execute({ id });

    return {
      status: 'success',
      message: 'album delete success',
    };
  }
}

export default AlbumsHandler;
