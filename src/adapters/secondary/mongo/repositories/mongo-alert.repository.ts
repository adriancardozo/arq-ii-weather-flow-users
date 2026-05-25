import { MongoRepository } from './mongo.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoTransactionService } from '../services/mongo-transaction.service';
import { Alert } from 'src/bussiness/entities/alert.entity';
import { CreateAlertInput } from 'src/bussiness/ports/input/services/dtos/input/create-alert.input';
import { IAlertRepository } from 'src/bussiness/ports/output/repositories/i-alert.repository';
import { Alert as AlertObject } from '../schemas/object/alert-object.schema';
import { AlertNotFoundError } from 'src/bussiness/errors/alert-not-found.error';

export class MongoAlertRepository
  extends MongoRepository<Alert, CreateAlertInput, never>
  implements IAlertRepository
{
  constructor(
    @InjectModel(Alert.name) AlertModel: Model<Alert>,
    transactionService: MongoTransactionService,
  ) {
    super(AlertObject, Alert, AlertNotFoundError, AlertModel, transactionService, ['users']);
  }
}
