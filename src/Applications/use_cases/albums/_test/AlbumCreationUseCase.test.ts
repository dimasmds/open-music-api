import AlbumRepository from '../../../../Domains/albums/repository/AlbumRepository';
import AlbumCreationUseCase from '../AlbumCreationUseCase';

describe('AlbumCreationUseCase', () => {
  const mockAlbumRepository = <AlbumRepository>{};
  const albumCreationUseCase = new AlbumCreationUseCase({
    albumRepository: mockAlbumRepository,
  });

  describe('execute', () => {
    it('should orchestrating flow correctly', async () => {
      mockAlbumRepository.persist = jest.fn(() => Promise.resolve('album-123'));

      const payload = {
        name: 'Viva la vida',
        year: 2000,
      };

      const albumId = await albumCreationUseCase.execute(payload);

      expect(albumId).toEqual('album-123');
      expect(mockAlbumRepository.persist).toBeCalled();
    });
  });
});
