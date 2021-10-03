import UpdateAlbumUseCase from '../UpdateAlbumUseCase';
import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import AlbumUpdate from '../../../../Domains/albums/entities/AlbumUpdate';

describe('UpdateAlbumUseCase.test.ts', () => {
  const mockAlbumRepository = <AlbumRepository>{};
  const updateAlbumUseCase = new UpdateAlbumUseCase({
    albumRepository: mockAlbumRepository,
  });

  it('should orchestrating flow update correctly', async () => {
    const payload = {
      id: 'album-123',
      name: 'Viva la vida',
      year: 2000,
    };

    mockAlbumRepository.isAlbumValid = jest.fn(() => Promise.resolve(true));
    mockAlbumRepository.updateAlbum = jest.fn(() => Promise.resolve());

    await updateAlbumUseCase.execute(payload);

    expect(mockAlbumRepository.isAlbumValid).toBeCalledWith('album-123');
    expect(mockAlbumRepository.updateAlbum).toBeCalledWith(
      await new AlbumUpdate(mockAlbumRepository).create(payload),
    );
  });
});
