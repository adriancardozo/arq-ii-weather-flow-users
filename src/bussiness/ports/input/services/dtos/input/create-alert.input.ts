export class CreateAlertInput {
  constructor(
    public users: Array<string>,
    public measurement: string,
    public datetime: Date,
    public alertType: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica',
    public pressure: number,
    public temperature: number,
    public humidity: number,
    public station: string,
  ) {}
}
