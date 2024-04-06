import { SetMetadata } from '@nestjs/common';

export const LogExecutionTime = () => SetMetadata('logExecTime', true);
