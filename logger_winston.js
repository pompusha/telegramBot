const winston = require("winston");
const { combine, timestamp, json, errors } = winston.format;
const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = winston.createLogger({
  level: "info",
  format: combine(errors({ stack: true }), timestamp(), json()),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "warn" }),
    new winston.transports.File({ filename: "app.log" }),
  ],
  // transports: [new winston.transports.Console()],
});

module.exports = { logger };
