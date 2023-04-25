import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { DomainValidationException } from '../Core/Domain/Exceptions/domain-validation.exception';
import { EntityNotFoundException } from '../Core/Domain/Exceptions/entity-not-found.exception';
import * as process from 'process';

@Catch()
export class ExceptionHandler implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.status || 500;
    const message: string = exception.message || 'internal server error';

    if (
      exception instanceof DomainValidationException ||
      exception instanceof EntityNotFoundException
    ) {
      const customMessage = JSON.parse(message);

      response.status(status).send({
        message: customMessage,
      });
    }

    if (exception instanceof BadRequestException) {
      const customMessage: any = exception.getResponse();

      response.status(exception.getStatus()).send({
        message: customMessage,
      });
    }

    if (process.env.NODE_ENV === 'development') {
      response.status(status).send({
        message: message,
        trace: exception.stack,
      });
    }

    response.status(status).send({
      message: 'Internal server error',
      statusCode: 500,
    });
  }
}
