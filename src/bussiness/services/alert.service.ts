import { Injectable } from '@nestjs/common';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { IAlertService } from '../ports/input/services/i-alert.service';
import { CreateAlertInput } from '../ports/input/services/dtos/input/create-alert.input';
import { Service } from './service';
import { Alert } from '../entities/alert.entity';
import { IAlertRepository } from '../ports/output/repositories/i-alert.repository';
import { User } from '../entities/user.entity';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';

@Injectable()
export class AlertService<Session = any>
  extends Service<Alert, CreateAlertInput, never, Session>
  implements IAlertService
{
  constructor(
    private readonly userRepository: IUserRepository,
    alertRepository: IAlertRepository,
    transactionService: ITransactionService,
  ) {
    super(alertRepository, transactionService);
  }

  override async create(input: CreateAlertInput, session?: Session): Promise<Alert> {
    return await this.transactionService.transaction(async (session) => {
      const alert = await super.create(input, session);
      const users: Array<User> = [];
      for (const userId of input.users) {
        const user = await this.userRepository.findOneByOrFail({ id: userId }, session);
        user.notifyAlert(alert);
        users.push(user);
      }
      await this.userRepository.updateMany(users);
      return alert;
    }, session);
  }
}
