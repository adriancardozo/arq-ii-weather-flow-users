import { BussinessError } from './bussiness.error';

export class AlertNonEditableError extends BussinessError {
  constructor(message?: string, options?: ErrorOptions) {
    super(message ?? 'Las alertas no se pueden editar', options);
  }
}
