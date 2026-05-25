import { AlertNonEditableError } from '../errors/alert-non-editable.error';
import { IEntity } from './i.entity';
import { User } from './user.entity';

export class Alert extends IEntity<never> {
  datetime: Date;
  alertType: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica';
  pressure: number;
  temperature: number;
  humidity: number;
  station: string;
  users: Array<User>;

  constructor(id: string);
  constructor(
    id: string | undefined,
    alertType: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica',
    pressure: number,
    temperature: number,
    humidity: number,
    station: string,
    users: Array<User>,
    datetime?: Date,
  );
  constructor(
    id: string,
    alertType?: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica',
    pressure?: number,
    temperature?: number,
    humidity?: number,
    station?: string,
    users?: Array<User>,
    datetime?: Date,
  ) {
    super();
    this.id = id;
    if (
      alertType !== undefined &&
      pressure !== undefined &&
      temperature !== undefined &&
      humidity !== undefined &&
      station !== undefined &&
      users !== undefined
    ) {
      this.alertType = alertType;
      this.pressure = pressure;
      this.temperature = temperature;
      this.humidity = humidity;
      this.station = station;
      this.users = users;
      if (datetime) this.datetime = datetime;
    }
  }

  edit(input: never): void {
    throw new AlertNonEditableError();
  }
}
