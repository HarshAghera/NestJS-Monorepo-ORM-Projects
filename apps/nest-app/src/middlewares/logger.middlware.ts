import { createLogger } from 'winston';
const DailyRotateFile = require('winston-daily-rotate-file');

export function logger(req:Object) {
  const logger = createLogger({
    level: 'info',
    transports: [
      new DailyRotateFile({
        filename: 'nest_request.log',
        maxFiles: '2d',
        dirname: 'D:/projects/apps/nest-app/src/logs',
      }),
    ],
  });
  logger.info({ Request: req });
}
