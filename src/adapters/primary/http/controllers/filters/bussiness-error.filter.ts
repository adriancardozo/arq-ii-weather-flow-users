import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  InternalServerErrorException,
  BadRequestException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter, HttpAdapterHost } from '@nestjs/core';
import { AlertNonEditableError } from 'src/bussiness/errors/alert-non-editable.error';
import { AlertNotFoundError } from 'src/bussiness/errors/alert-not-found.error';
import { BussinessError } from 'src/bussiness/errors/bussiness.error';
import { UserAlreadyExistsError } from 'src/bussiness/errors/user-already-exists.error';
import { UserNotFoundError } from 'src/bussiness/errors/user-not-found.error';

@Catch(BussinessError)
export class BussinessExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(BussinessExceptionFilter.name);
  private readonly baseFilter: BaseExceptionFilter;

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {
    this.baseFilter = new BaseExceptionFilter(this.httpAdapterHost.httpAdapter);
  }

  catch(exception: BussinessError, host: ArgumentsHost) {
    try {
      if (exception instanceof AlertNotFoundError) throw new NotFoundException(exception.message);
      if (exception instanceof UserNotFoundError) throw new NotFoundException(exception.message);
      if (exception instanceof AlertNonEditableError) throw new BadRequestException(exception.message);
      if (exception instanceof UserAlreadyExistsError) throw new BadRequestException(exception.message);
      throw new InternalServerErrorException();
    } catch (error) {
      this.logger.error(error);
      this.baseFilter.catch(error, host);
    }
  }
}
