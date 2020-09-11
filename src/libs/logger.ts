import winston, { createLogger, transports, format } from 'winston';
import { MongoDB } from 'winston-mongodb';
import config from '../config/configuration';

const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new MongoDB({
      level: 'error',
      db: config.mongoUrl
    })
  ]
});

export default logger;
