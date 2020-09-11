import winston, { createLogger, transports, format } from 'winston';
const { combine, timestamp, printf, colorize } = format;

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const transport = new transports.Console();
const logger = createLogger({
  format: combine(
    timestamp(),
    colorize(),
    myFormat,
  ),
  transports: [new transports.Console()]
});

export default logger;
