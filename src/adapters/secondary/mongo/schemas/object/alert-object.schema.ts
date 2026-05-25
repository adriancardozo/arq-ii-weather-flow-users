import { Alert as AlertEntity } from 'src/bussiness/entities/alert.entity';
import { User } from './user-object.schema';
import { Type } from 'class-transformer';

export class Alert extends AlertEntity {
  @Type(() => User)
  declare users: Array<User>;
}
