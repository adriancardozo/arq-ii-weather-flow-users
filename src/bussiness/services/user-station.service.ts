import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { IUserStationService } from '../ports/input/services/i-user-station.service';
import { ITransactionService } from '../ports/output/services/i-transaction.service';
import { IUserRepository } from '../ports/output/repositories/i-user.repository';

@Injectable()
export class UserStationService<Session = any> implements IUserStationService {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly transactionService: ITransactionService,
  ) {}

  async updateOwner(
    stationId: string,
    oldId: string | null,
    newId: string | null,
    session?: Session,
  ): Promise<void> {
    return await this.transactionService.transaction(async (session) => {
      if (oldId) {
        const oldOwner = await this.userRepository.findOneByOrFail({ id: oldId }, session);
        oldOwner.removeStation(stationId);
        await this.userRepository.updateOne(oldOwner, session);
      }
      if (newId) {
        const newOwner = await this.userRepository.findOneByOrFail({ id: newId }, session);
        newOwner.addStation(stationId);
        await this.userRepository.updateOne(newOwner, session);
      }
    }, session);
  }

  async subscribe(stationId: string, userId: string, session?: Session): Promise<User> {
    return await this.transactionService.transaction(async (session) => {
      const user = await this.userRepository.findOneByOrFail({ id: userId }, session);
      user.subscribe(stationId);
      await this.userRepository.updateOne(user, session);
      return user;
    }, session);
  }
}
