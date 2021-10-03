import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import DeleteAlbumUseCase from '../DeleteAlbumUseCase';

describe('DeleteAlbumUseCase', () => {
  const mockAlbumRepository = <AlbumRepository> {};
  const deleteAlbumUseCase = new DeleteAlbumUseCase({
    albumRepository: mockAlbumRepository,
  });

  it('should throw error when payload not contain id', async () => {
    const payload = {};

    // Action
    await expect(deleteAlbumUseCase.execute(payload)).rejects.toThrowError('DELETE_ALBUM.ID_NOT_DEFINED');
  });

  it('should throw error when id not string', async () => {
    const payload = {
      id: 123,
    };

    // Action
    await expect(deleteAlbumUseCase.execute(payload)).rejects.toThrowError('DELETE_ALBUM.ID_NOT_STRING');
  });

  it('should throw error when album not valid', async () => {
    const payload = {
      id: 'album-123',
    };

    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(false));

    // Action
    await expect(deleteAlbumUseCase.execute(payload)).rejects.toThrowError('DELETE_ALBUM.ID_NOT_VALID');
    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
  });

  it('should orchestrating flow delete correctly', async () => {
    const payload = {
      id: 'album-123',
    };

    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));
    mockAlbumRepository.deleteAlbum = jest.fn(() => Promise.resolve());

    // Action
    await deleteAlbumUseCase.execute(payload);

    // Assert
    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
    expect(mockAlbumRepository.deleteAlbum).toBeCalledWith('album-123');
  });
});
