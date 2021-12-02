/* eslint-disable no-unused-vars */
import NewActivity from '../entities/NewActivity';

interface ActivitiesRepository {
  persist(activity: NewActivity): Promise<void>;
}

export default ActivitiesRepository;
