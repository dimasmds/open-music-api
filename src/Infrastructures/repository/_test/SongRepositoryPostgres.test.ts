import pool from '../../database/postgres/pool';
import SongCreation from '../../../Domains/songs/entities/SongCreation';
import AlbumRepository from '../../../Domains/albums/repository/AlbumRepository';
import SongsTableTestHelper from './_helper/SongsTableTestHelper';
import SongRepositoryPostgres from '../SongRepositoryPostgres';
import AlbumsTableTestHelper from './_helper/AlbumsTableTestHelper';
import SongDetail from '../../../Domains/songs/entities/SongDetail';
import SongUpdate from '../../../Domains/songs/entities/SongUpdate';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistsTableTestHelper from './_helper/PlaylistsTableTestHelper';
import UsersTableTestHelper from './_helper/UsersTableTestHelper';
import PlaylistSongsTableTestHelper from './_helper/PlaylistSongsTableTestHelper';

describe('SongRepositoryPostgres', () => {
  const fakeIdGenerator = () => '123';
  const songRepositoryPostgres = new SongRepositoryPostgres({
    pool,
    idGenerator: fakeIdGenerator,
  });

  beforeEach(async () => {
    await UsersTableTestHelper.cleanTable();
    await SongsTableTestHelper.cleanTable();
    await AlbumsTableTestHelper.cleanTable();
    await PlaylistsTableTestHelper.cleanTable();
    await PlaylistSongsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('persist', () => {
    const songCreation = new SongCreation(<AlbumRepository>{});

    songCreation.title = 'Fix you';
    songCreation.year = 2020;
    songCreation.performer = 'Coldplay';
    songCreation.genre = 'Pop';
    songCreation.duration = null;
    songCreation.albumId = null;

    it('should persist song to database when duration and albumId null', async () => {
      // Action
      await songRepositoryPostgres.persist(songCreation);

      // Assert
      const songs = await SongsTableTestHelper.findSongsById('song-123');
      expect(songs).toHaveLength(1);
      expect(songs[0].id).toEqual('song-123');
      expect(songs[0].title).toEqual('Fix you');
      expect(songs[0].year).toEqual(2020);
      expect(songs[0].performer).toEqual('Coldplay');
      expect(songs[0].genre).toEqual('Pop');
      expect(songs[0].duration).toEqual(null);
      expect(songs[0].album_id).toEqual(null);
    });

    it('should persist song to database when duration and albumId not null', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-123' });

      songCreation.duration = 90;
      songCreation.albumId = 'album-123';

      // Action
      await songRepositoryPostgres.persist(songCreation);

      // Assert
      const songs = await SongsTableTestHelper.findSongsById('song-123');
      expect(songs[0].duration).toEqual(90);
      expect(songs[0].album_id).toEqual('album-123');
    });

    it('should return song id', async () => {
      // Action
      songCreation.albumId = null;
      const songId = await songRepositoryPostgres.persist(songCreation);

      // Assert
      expect(songId).toEqual('song-123');
    });
  });

  describe('isSongValid', () => {
    it('should return false when song id not valid', async () => {
      // Action
      const isValid = await songRepositoryPostgres.isSongValid('song-123');

      // Assert
      expect(isValid).toEqual(false);
    });

    it('should return true when song id valid', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-321' });

      // Action
      const isValid = await songRepositoryPostgres.isSongValid('song-321');

      // Arrange
      expect(isValid).toEqual(true);
    });
  });

  describe('getSongs', () => {
    it('should return all songs in database', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await SongsTableTestHelper.addSong({ id: 'song-124' });
      await SongsTableTestHelper.addSong({ id: 'song-125' });

      // Action
      const songs = await songRepositoryPostgres.getSongs();

      // Assert
      expect(songs).toHaveLength(3);
      expect(songs[0].id).toEqual('song-123');
      expect(songs[1].id).toEqual('song-124');
      expect(songs[2].id).toEqual('song-125');
    });
  });

  describe('getSongById', () => {
    it('should return null if song not found', async () => {
      // Action
      const song = await songRepositoryPostgres.getSongById('song-123');

      // Assert
      expect(song).toEqual(null);
    });

    it('should return SongDetail if song found', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123' });

      // Action
      const song = await songRepositoryPostgres.getSongById('song-123');

      // Assert
      expect(song).toBeInstanceOf(SongDetail);
      expect(song.id).toEqual('song-123');
      expect(song.year).toEqual(2000);
      expect(song.genre).toEqual('pop');
      expect(song.performer).toEqual('Coldplay');
    });
  });

  describe('getSongsInAlbum', () => {
    it('should return songs in album correctly', async () => {
      // Arrange
      await AlbumsTableTestHelper.addAlbum({ id: 'album-123' });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await SongsTableTestHelper.addSong({ id: 'song-124', albumId: 'album-123' });
      await SongsTableTestHelper.addSong({ id: 'song-125', albumId: 'album-123' });
      await SongsTableTestHelper.addSong({ id: 'song-126', albumId: 'album-123' });

      // Action
      const songs = await songRepositoryPostgres.getSongsInAlbum('album-123');

      // Assert
      expect(songs).toHaveLength(3);
      const [songA, songB, songC] = songs;
      expect(songA.id).toEqual('song-124');
      expect(songB.id).toEqual('song-125');
      expect(songC.id).toEqual('song-126');
    });
  });

  describe('update', () => {
    it('should update song to database', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      const songUpdate = new SongUpdate(<SongRepository>{}, <AlbumRepository>{});
      songUpdate.id = 'song-123';
      songUpdate.title = 'Viva la vida';
      songUpdate.year = 2020;
      songUpdate.performer = 'Coldplay';
      songUpdate.genre = 'Pop';
      songUpdate.duration = null;
      songUpdate.albumId = null;

      // Action
      await songRepositoryPostgres.update(songUpdate);

      // Assert
      const [song] = await SongsTableTestHelper.findSongsById('song-123');
      expect(song.title).toEqual('Viva la vida');
      expect(song.performer).toEqual('Coldplay');
    });
  });

  describe('deleteSongById', () => {
    it('should delete song correctly from database', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123' });

      // Action
      await songRepositoryPostgres.deleteSongById('song-123');

      // Assert
      const songs = await SongsTableTestHelper.findSongsById('song-123');
      expect(songs).toHaveLength(0);
    });
  });

  describe('getSongsInPlaylist', () => {
    it('should return array of songs in playlist', async () => {
      // Arrange
      await SongsTableTestHelper.addSong({ id: 'song-123', title: 'Test Song A' });
      await SongsTableTestHelper.addSong({ id: 'song-124', title: 'Test Song B' });
      await SongsTableTestHelper.addSong({ id: 'song-125', title: 'Test Song C' });
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({ id: 'playlist-123', owner: 'user-123' });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({
        id: 'playlist-song-123',
        playlistId: 'playlist-123',
        songId: 'song-123',
      });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({
        id: 'playlist-song-124',
        playlistId: 'playlist-123',
        songId: 'song-124',
      });

      // Action
      const songs = await songRepositoryPostgres.getSongsInPlaylist('playlist-123');

      // Assert
      expect(songs).toHaveLength(2);
      const [songA, songB] = songs;
      expect(songA.id).toEqual('song-123');
      expect(songA.title).toEqual('Test Song A');
      expect(songB.id).toEqual('song-124');
      expect(songB.title).toEqual('Test Song B');
    });
  });
});
