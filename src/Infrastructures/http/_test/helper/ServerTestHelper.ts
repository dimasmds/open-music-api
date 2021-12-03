/* istanbul ignore file */
import createServer from '../../createServer';
import container from '../../../container/container';

const ServerTestHelper = {
  async createUserAndLogin({ username = 'dimasmds', password = 'secret' } = {}) {
    await this.userCreation({ username, password });
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username,
        password,
      },
    });

    return JSON.parse(response.payload);
  },

  async createPlaylist({ name = 'Playlist Test', accessToken } : { name: string, accessToken: string }) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/playlists',
      payload: {
        name,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return JSON.parse(response.payload);
  },

  async addSongToPlaylist({ playlistId = 'playlist-123', songId = 'song-123', accessToken }: any = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: `/playlists/${playlistId}/songs`,
      payload: {
        songId,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return JSON.parse(response.payload);
  },

  async removeSongFromPlaylist({ playlistId = 'playlist-123', songId = 'song-123', accessToken } : any = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'DELETE',
      url: `/playlists/${playlistId}/songs`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      payload: {
        songId,
      },
    });

    return JSON.parse(response.payload);
  },

  async login({ username = 'dimasmds', password = 'secret' } = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/authentications',
      payload: {
        username,
        password,
      },
    });

    return JSON.parse(response.payload);
  },

  async userCreation({ username = 'dimasmds', password = 'secret', fullname = 'Dimas Maulana' } = {}) {
    const server = await createServer(container);

    const response = await server.inject({
      method: 'POST',
      url: '/users',
      payload: {
        username,
        password,
        fullname,
      },
    });

    return JSON.parse(response.payload);
  },
};

export default ServerTestHelper;
