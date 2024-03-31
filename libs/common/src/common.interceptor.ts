import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const startTime = Date.now();

    return next.handle().pipe(
      map((data) => {
        const endTime = Date.now();
        const elapsedTime = endTime - startTime;
        const response = {
          value: data ? data : {},
          error: false,
          messages: [],
        };

        console.log(
          `Request ${context.switchToHttp().getRequest().method} ${context.switchToHttp().getRequest().url} - ${elapsedTime}ms`,
        );
        return response;
      }),
    );
  }
}
