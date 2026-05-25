import { ApiProperty } from '@nestjs/swagger';
import { Alert } from 'src/bussiness/entities/alert.entity';

export class AlertResponse {
  @ApiProperty()
  id: string;
  @ApiProperty()
  datetime: string;
  @ApiProperty({ enum: ['Calor extremo', 'Helada', 'Tormenta', 'Humedad crítica'] })
  alert_type: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica';
  @ApiProperty()
  pressure: number;
  @ApiProperty()
  temperature: number;
  @ApiProperty()
  humidity: number;

  constructor(alert: Alert) {
    this.id = alert.id!;
    this.datetime = alert.datetime.toISOString();
    this.alert_type = alert.alertType;
    this.pressure = alert.pressure;
    this.temperature = alert.temperature;
    this.humidity = alert.humidity;
  }
}
