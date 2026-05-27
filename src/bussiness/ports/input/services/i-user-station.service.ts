import { User } from '../../../entities/user.entity';

export abstract class IUserStationService {
  abstract updateOwner(stationId: string, oldId: string | null, newId: string | null): Promise<void>;

  abstract subscribe(stationId: string, userId: string): Promise<User>;
}
