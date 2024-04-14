import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class CustomInterceptor implements NestInterceptor {
  constructor() {}
  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) => {
        const response = {
          value: data ? data : {},
          error: false,
          messages: [],
        };
        return response;
      }),
    );
  }
}
