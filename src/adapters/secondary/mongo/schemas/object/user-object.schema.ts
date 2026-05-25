import { User as UserEntity } from 'src/bussiness/entities/user.entity';
import { Type } from 'class-transformer';
import { Alert } from './alert-object.schema';

export class User extends UserEntity {
  @Type(() => Alert)
  declare alerts: Array<Alert>;
}
