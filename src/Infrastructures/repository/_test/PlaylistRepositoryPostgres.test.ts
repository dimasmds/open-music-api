import PlaylistRepositoryPostgres from '../PlaylistRepositoryPostgres';
import pool from '../../database/postgres/pool';
import UsersTableTestHelper from './_helper/UsersTableTestHelper';
import PlaylistsTableTestHelper from './_helper/PlaylistsTableTestHelper';
import PlaylistCreation from '../../../Domains/playlists/entities/PlaylistCreation';
import UserRepository from '../../../Domains/users/repository/UserRepository';
import SongsTableTestHelper from './_helper/SongsTableTestHelper';
import PlaylistSongCreation from '../../../Domains/playlists/entities/PlaylistSongCreation';
import PlaylistRepository from '../../../Domains/playlists/repository/PlaylistRepository';
import SongRepository from '../../../Domains/songs/repository/SongRepository';
import PlaylistSongsTableTestHelper from './_helper/PlaylistSongsTableTestHelper';

describe('PlaylistRepositoryPostgres', () => {
  const fakeIdGenerator = () => '123';
  const playlistRepositoryPostgres = new PlaylistRepositoryPostgres({
    pool,
    idGenerator: fakeIdGenerator,
  });

  beforeEach(async () => {
    await PlaylistsTableTestHelper.cleanTable();
    await UsersTableTestHelper.cleanTable();
    await SongsTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('persist', () => {
    it('should persist playlist record correctly', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      const playlistCreation = new PlaylistCreation(<UserRepository>{});
      playlistCreation.name = 'Playlist name';
      playlistCreation.userId = 'user-123';

      // Action
      const playlistId = await playlistRepositoryPostgres.persist(playlistCreation);

      // Assert
      const playlists = await PlaylistsTableTestHelper.findPlaylistById(playlistId);

      expect(playlistId).toBe('playlist-123');
      expect(playlists.length).toBe(1);
      expect(playlists[0].id).toBe(playlistId);
      expect(playlists[0].name).toBe(playlistCreation.name);
      expect(playlists[0].owner).toBe(playlistCreation.userId);
    });
  });

  describe('getPlaylists', () => {
    it('should return all playlist by user id', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dimasmds' });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-123',
        name: 'Playlist name',
        owner: 'user-123',
      });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-456',
        name: 'Playlist name 2',
        owner: 'user-123',
      });

      // Action
      const playlists = await playlistRepositoryPostgres.getPlaylists('user-123');

      // Assert
      expect(playlists.length).toBe(2);
      expect(playlists[0].id).toBe('playlist-123');
      expect(playlists[0].name).toBe('Playlist name');
      expect(playlists[0].username).toBe('dimasmds');
      expect(playlists[1].id).toBe('playlist-456');
      expect(playlists[1].name).toBe('Playlist name 2');
      expect(playlists[1].username).toBe('dimasmds');
    });
  });

  describe('getPlaylist', () => {
    it('should return playlist by id', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123', username: 'dimasmds' });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-123',
        name: 'Playlist name',
        owner: 'user-123',
      });

      // Action
      const playlist = await playlistRepositoryPostgres.getPlaylist('playlist-123');

      // Assert
      expect(playlist.id).toBe('playlist-123');
      expect(playlist.name).toBe('Playlist name');
      expect(playlist.username).toBe('dimasmds');
      expect(playlist.songs).toBe(null);
    });
  });

  describe('deletePlaylist', () => {
    it('should delete playlist record from database', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-123',
        name: 'Playlist name',
        owner: 'user-123',
      });

      // Action
      await playlistRepositoryPostgres.deletePlaylist('playlist-123');

      // Assert
      const playlists = await PlaylistsTableTestHelper.findPlaylistById('playlist-123');
      expect(playlists.length).toBe(0);
    });
  });

  describe('isAnOwnerPlaylist', () => {
    it('should return false if playlist id and user id not match', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-123',
        name: 'Playlist name',
        owner: 'user-123',
      });

      // Action
      const isOwner = await playlistRepositoryPostgres.isAnOwnerPlaylist('playlist-123', 'user-456');

      // Assert
      expect(isOwner).toBe(false);
    });

    it('should return true if playlist id and user id match', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({
        id: 'playlist-123',
        name: 'Playlist name',
        owner: 'user-123',
      });

      // Action
      const isOwner = await playlistRepositoryPostgres.isAnOwnerPlaylist('playlist-123', 'user-123');

      // Assert
      expect(isOwner).toBe(true);
    });
  });

  describe('isPlaylistIdValid', () => {
    it('should return false if playlist id not found', async () => {
      // Action
      const isValid = await playlistRepositoryPostgres.isPlaylistIdValid('playlist-123');

      // Assert
      expect(isValid).toBe(false);
    });

    it('should return true if playlist id founded', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({ id: 'playlist-123' });

      // Action
      const isValid = await playlistRepositoryPostgres.isPlaylistIdValid('playlist-123');

      // Assert
      expect(isValid).toBe(true);
    });
  });

  describe('persistSongToPlaylist', () => {
    it('should persist songs to playlist in database', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({ id: 'playlist-123', owner: 'user-123' });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      const playlistSongsCreation = new PlaylistSongCreation(
        <PlaylistRepository>{}, <SongRepository>{},
      );
      playlistSongsCreation.playlistId = 'playlist-123';
      playlistSongsCreation.songId = 'song-123';

      // Action
      await playlistRepositoryPostgres.persistSongToPlaylist(playlistSongsCreation);

      // Assert
      const playlist = await PlaylistSongsTableTestHelper.findSongInPlaylist('song-123', 'playlist-123');
      expect(playlist.length).toBe(1);
    });
  });

  describe('deleteSongInPlaylist', () => {
    it('should delete song from playlist in database', async () => {
      // Arrange
      await UsersTableTestHelper.addUser({ id: 'user-123' });
      await PlaylistsTableTestHelper.addPlaylist({ id: 'playlist-123', owner: 'user-123' });
      await SongsTableTestHelper.addSong({ id: 'song-123' });
      await PlaylistSongsTableTestHelper.addPlaylistSongs({
        id: 'psong-123',
        playlistId: 'playlist-123',
        songId: 'song-123',
      });

      // Action
      await playlistRepositoryPostgres.deleteSongInPlaylist('playlist-123', 'song-123');

      // Assert
      const playlist = await PlaylistSongsTableTestHelper.findSongInPlaylist('song-123', 'playlist-123');
      expect(playlist.length).toBe(0);
    });
  });
});
