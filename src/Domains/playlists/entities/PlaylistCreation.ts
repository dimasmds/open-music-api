import UserRepository from '../../users/repository/UserRepository';

class PlaylistCreation {
  private userRepository: UserRepository;

  public name: string;

  public userId: string;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async create(payload: any = {}) {
    PlaylistCreation.verifyPayload(payload);

    const { name, userId } = payload;

    const isUserIdValid = await this.userRepository.isUserIdValid(userId);

    if (!isUserIdValid) {
      throw new Error('PLAYLIST_CREATION.USER_ID_NOT_VALID');
    }

    this.name = name;
    this.userId = userId;

    return this;
  }

  private static verifyPayload({ name, userId }: any) {
    if (!name) {
      throw new Error('PLAYLIST_CREATION.NOT_CONTAIN_NAME');
    }

    if (typeof name !== 'string') {
      throw new Error('PLAYLIST_CREATION.NOT_STRING');
    }

    if (name.length > 50) {
      throw new Error('PLAYLIST_CREATION.NAME_MORE_THAN_50_CHAR');
    }

    if (!userId) {
      throw new Error('PLAYLIST_CREATION.NOT_CONTAIN_USER_ID');
    }

    if (typeof userId !== 'string') {
      throw new Error('PLAYLIST_CREATION.USER_ID_NOT_STRING');
    }
  }
}

export default PlaylistCreation;
