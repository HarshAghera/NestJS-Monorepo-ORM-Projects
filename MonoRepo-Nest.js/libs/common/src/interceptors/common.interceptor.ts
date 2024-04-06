import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler) {
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        let elapsedTime,
          log = `Request ${context.switchToHttp().getRequest().method} ${context.switchToHttp().getRequest().url}`;
        const isLogExecTime = this.reflector.get<boolean>(
          'logExecTime',
          context.getHandler(),
        );

        if (isLogExecTime) {
          const endTime = Date.now();
          elapsedTime = endTime - startTime;
          log += `- ${elapsedTime}ms`;
        }
        const response = {
          value: data ? data : {},
          error: false,
          messages: [],
        };

        console.log(log);
        return response;
      }),
    );
  }
}
