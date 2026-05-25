import { BussinessError } from './bussiness.error';

export class AlertNotFoundError extends BussinessError {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? 'Alerta no encontrada', options);
  }
}
