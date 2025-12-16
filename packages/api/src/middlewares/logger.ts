import winston from 'winston';

const { combine, timestamp, json, colorize } = winston.format;

const logger = winston.createLogger({
  format: combine(colorize({ all: true }), timestamp(), json()),
  level: 'http',
  transports: [new winston.transports.Console()],
});

export default logger;
