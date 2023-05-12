const pino = require('pino');

module.exports = class Logger {
  constructor(level) {
    this.level = level;
    this.logger = pino({
      base: undefined,
      timestamp: false,
      formatters: {
        level: (label) => ({ level: label.toUpperCase() }),
      },
    });
  }

  debug = (context, message) => {
    this.logger.debug(context.getAllFields(), message);
  };

  info = (context, message) => {
    this.logger.info(context.getAllFields(), message);
  };

  warn = (context, message) => {
    this.logger.warn(context.getAllFields(), message);
  };

  error = (context, message) => {
    this.logger.error(context.getAllFields(), message);
  };

  fatal = (context, message) => {
    this.logger.fatal(context.getAllFields(), message);
  };

  logSqlQuery = (context) => {
    return (query, timeElapsed) => {
      this.logger.info(context.getAllFields(), {
        query,
        timeElapsed: `${timeElapsed}ms`,
      });
    };
  };
};
