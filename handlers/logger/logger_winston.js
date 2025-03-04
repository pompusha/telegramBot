const winston = require("winston");
const { combine, timestamp, json, errors, colorize, simple } = winston.format;

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = winston.createLogger({
  levels: logLevels,
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({
      filename: "error.log",
      level: "warn",
    }),
    new winston.transports.File({
      filename: "app.log",
    }),
    new winston.transports.Console({
      format: combine(colorize(), simple()),
    }),
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: "exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "rejections.log" }),
  ],
});

module.exports = { logger };
