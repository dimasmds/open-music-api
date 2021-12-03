/* eslint-disable no-unused-vars */
import NewActivity from '../entities/NewActivity';
import Activity from '../entities/Activity';

interface ActivitiesRepository {
  persist(activity: NewActivity): Promise<void>;
  getActivitiesInPlaylist(playlistId: string): Promise<Activity[]>;
}

export default ActivitiesRepository;
