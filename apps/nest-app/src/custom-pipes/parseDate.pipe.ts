import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const timestamp = value?.timestamp;

    if (!timestamp) {
      throw new BadRequestException('Timestamp is required');
    }

    const parsedTimestamp = parseInt(timestamp, 10);
    if (isNaN(parsedTimestamp)) {
      throw new BadRequestException('Invalid timestamp');
    }
    return { timestamp };
  }
}
