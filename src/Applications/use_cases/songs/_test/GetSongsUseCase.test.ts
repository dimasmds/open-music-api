import Song from '../../../../Domains/songs/entities/Song';
import SongRepository from '../../../../Domains/songs/repository/SongRepository';
import GetSongsUseCase from '../GetSongsUseCase';

describe('GetSongsUseCase', () => {
  const mockSongRepository = <SongRepository>{};

  const getSongsUseCase = new GetSongsUseCase({
    songRepository: mockSongRepository,
  });

  it('should orchestrating flow correctly', async () => {
    const expectedSongs: Song[] = [
      new Song({ id: 'song-123', title: 'Viva la vida', performer: 'Coldplay' }),
      new Song({ id: 'song-124', title: 'Viva la vida', performer: 'Coldplay' }),
      new Song({ id: 'song-125', title: 'Viva la vida', performer: 'Coldplay' }),
    ];

    mockSongRepository.getSongs = jest.fn(() => Promise.resolve(expectedSongs));

    // Action
    const songs = await getSongsUseCase.execute();

    // Assert
    expect(songs).toEqual(expectedSongs);
    expect(mockSongRepository.getSongs).toBeCalled();
  });
});
