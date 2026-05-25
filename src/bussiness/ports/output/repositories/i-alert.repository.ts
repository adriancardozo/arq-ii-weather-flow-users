import { CreateAlertInput } from '../../input/services/dtos/input/create-alert.input';
import { IRepository } from './i.respository';
import { Alert } from 'src/bussiness/entities/alert.entity';

export abstract class IAlertRepository<Session = any> extends IRepository<
  Alert,
  CreateAlertInput,
  never,
  Session
> {}
