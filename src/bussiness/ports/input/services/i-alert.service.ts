import { Alert } from 'src/bussiness/entities/alert.entity';
import { CreateAlertInput } from './dtos/input/create-alert.input';

export abstract class IAlertService {
  abstract create(input: CreateAlertInput): Promise<Alert>;
}
