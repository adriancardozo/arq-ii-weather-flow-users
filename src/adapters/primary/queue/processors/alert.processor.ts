import { IAlertService } from 'src/bussiness/ports/input/services/i-alert.service';
import { ServiceBusProcessorManager } from '../helpers/service-bus-processor-manager.helper';
import { AlertDto } from './dtos/alert.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AlertProcessor {
  constructor(
    private readonly manager: ServiceBusProcessorManager,
    private readonly alertService: IAlertService,
  ) {
    this.manager.add('alert', (data: AlertDto) => this.alert(data), AlertDto);
  }

  async alert(data: AlertDto): Promise<void> {
    await this.alertService.create(data.toInput());
  }
}
