import { EditUserInput } from '../ports/input/services/dtos/input/edit-user.input';
import { LoginInput } from '../ports/input/services/dtos/input/login.input';
import { Alert } from './alert.entity';
import { IEntity } from './i.entity';

export class User extends IEntity<EditUserInput> {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  stations: Array<string> = [];
  subscriptions: Array<string> = [];
  alerts: Array<Alert> = [];

  constructor(id: string | null);
  constructor(id: string, firstName: string, lastName: string, email: string, password: string);
  constructor(id: string | null, firstName?: string, lastName?: string, email?: string, password?: string) {
    super();
    this.id = id;
    if (firstName && lastName && email && password) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.password = password;
    }
  }

  edit({ firstName, lastName, email }: EditUserInput) {
    this.firstName = firstName ?? this.firstName;
    this.lastName = lastName ?? this.lastName;
    this.email = email ?? this.email;
  }

  loginInput(): LoginInput {
    return new LoginInput(this.id, this.email);
  }

  addStation(station: string) {
    this.stations = [...this.stations, station];
  }

  removeStation(id: string) {
    this.stations = this.stations?.filter((station) => station !== id) ?? [];
  }

  subscribe(station: string) {
    this.subscriptions = [...this.subscriptions, station];
  }

  notifyAlert(alert: Alert): void {
    this.alerts = [...this.alerts, alert];
  }
}
