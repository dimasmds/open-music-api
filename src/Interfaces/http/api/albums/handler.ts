import { Container } from 'instances-container';
import { Request, ResponseToolkit } from '@hapi/hapi';
import AlbumCreationUseCase from '../../../../Applications/use_cases/albums/AlbumCreationUseCase';
import GetAlbumDetailUseCase from '../../../../Applications/use_cases/albums/GetAlbumDetailUseCase';
import UpdateAlbumUseCase from '../../../../Applications/use_cases/albums/UpdateAlbumUseCase';
import DeleteAlbumUseCase from '../../../../Applications/use_cases/albums/DeleteAlbumUseCase';
import AddCoverAlbumUseCase from '../../../../Applications/use_cases/albums/AddCoverAlbumUseCase';
import LikeAlbumUseCase from '../../../../Applications/use_cases/albums/LikeAlbumUseCase';

class AlbumsHandler {
  private container: Container;

  constructor(container: Container) {
    this.container = container;

    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postAlbumCoverHandler = this.postAlbumCoverHandler.bind(this);
    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
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

  async postAlbumCoverHandler(request: Request, h: ResponseToolkit) {
    const useCase = this.container.getInstance(AddCoverAlbumUseCase.name) as AddCoverAlbumUseCase;
    const { albumId } = request.params;
    const { cover } = request.payload as any;
    const { hapi: { headers } } = cover;

    await useCase.execute({ cover, albumId, contentType: headers['content-type'] });

    const response = h.response({
      status: 'success',
      message: 'album cover upload success',
    });
    response.code(201);
    return response;
  }

  async postAlbumLikeHandler(request: Request, h: ResponseToolkit) {
    const { userId } = request.auth.credentials;
    const { albumId } = request.params;

    const useCase = this.container.getInstance(LikeAlbumUseCase.name) as LikeAlbumUseCase;

    const message = await useCase.execute({ userId, albumId });

    const response = h.response({
      status: 'success',
      message,
    });
    response.code(201);
    return response;
  }
}

export default AlbumsHandler;
