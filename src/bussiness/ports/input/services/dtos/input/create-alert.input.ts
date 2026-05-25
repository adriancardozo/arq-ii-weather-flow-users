export class CreateAlertInput {
  constructor(
    public datetime: Date,
    public alertType: 'Calor extremo' | 'Helada' | 'Tormenta' | 'Humedad crítica',
    public pressure: number,
    public temperature: number,
    public humidity: number,
    public station: string,
  ) {}
}
